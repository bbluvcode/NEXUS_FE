/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import { getPlanFeeById, getAllPlanFees } from '../../services/planFeeService';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../../style/ManStyle.module.css';

const PlanDetail = () => {
    const { planId } = useParams();
    const [planFees, setPlanFees] = useState([]);
    const [loading, setLoadingState] = useState(true);
    const [allPlanFees, setAllPlanFees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setLoadingState(true);
        getPlanFeeById(planId)
            .then((planFeesData) => {
                if (planFeesData && planFeesData.planFeeId) {
                    setPlanFees([planFeesData]);
                } else {
                    setPlanFees([]);
                }
                setLoadingState(false);
            })
            .catch((error) => {
                console.error('Lỗi khi fetch dữ liệu:', error);
                setLoadingState(false);
            });

        getAllPlanFees()
            .then((data) => {
                console.log('Tất cả kế hoạch phí:', data);
                setAllPlanFees(data);
            })
            .catch((error) => {
                console.error('Lỗi khi fetch tất cả kế hoạch phí:', error);
            });
    }, [planId]);

    if (loading) {
        return <Loading message="Loading plan fees..." />;
    }

    const renderPlanFees = () => {
        if (!planFees || planFees.length === 0) {
            return <div>No fees available for this plan.</div>;
        }

        return planFees.map((fee, index) => {
            if (!fee) {
                return null;
            }

            return (
                <div key={index} className={styles.planFeeCard}>
                    <div className={styles.planFeeInfo}>
                        <div className={styles.planFeeItem}>
                            <strong>Duration</strong>
                            {fee.planFeeName}
                        </div>
                        <div className={styles.planFeeItem}>
                            <strong>Rental</strong>
                            ${fee.rental}
                        </div>
                        <div className={styles.planFeeItem}>
                            <strong>Description</strong>
                            {fee.description}
                        </div>
                    </div>
                    <div className={styles.planDetails}>
                        <strong>Belongs to Plan:</strong> {fee.plan?.planName || 'No Plan Name'}
                        <br />
                    </div>
                    <div className={styles.registerBtn}>
                        <button>
                            Register
                        </button>
                    </div>
                </div>
            );
        });
    };

    const renderAllPlanFees = () => {
        if (!allPlanFees || allPlanFees.length === 0) {
            return <div>No other plan fees available.</div>;
        }

        // Xáo trộn mảng allPlanFees
        const shuffledPlanFees = shuffle(allPlanFees);

        // Loại bỏ planFee hiện tại (đang xem)
        const filteredPlanFees = shuffledPlanFees.filter(fee => fee.planFeeId !== Number(planId)).slice(0, 5);

        return (
            <Slider {...sliderSettings}>
                {filteredPlanFees.map((fee, index) => (
                    <div key={index} className={styles.planFeeSliderItem}>
                        <div className={styles.planFeeCard}>
                            <div className={styles.planFeeInfo}>
                                <div className={styles.planFeeItem}>
                                    <strong>Duration</strong>
                                    {fee.planFeeName}
                                </div>
                                <div className={styles.planFeeItem}>
                                    <strong>Rental</strong>
                                    ${fee.rental}
                                </div>
                            </div>
                            <div className={styles.registerBtn}>
                                <button onClick={() => navigate(`/servicesDetail/${fee.planFeeId}`)}>
                                    View
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        );
    };

    // Hàm xáo trộn mảng
    const shuffle = (array) => {
        let shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    // Cấu hình cho carousel slider
    const sliderSettings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3, // Thay đổi số lượng item hiển thị
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };


    return (
        <div className={styles.planDetailContainer}>
            {renderPlanFees()}

            <div className={styles.carouselContainerService}> {/* Container cho carousel */}
                <h4>Similar Services:</h4>
                {renderAllPlanFees()}
            </div>
        </div>

    );
};

export default PlanDetail;
