/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'
import axios from 'axios'
import { getAllEmployees } from '../../../services/employeeService'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import styles from '../../../style/ManStyle.module.css' // Import CSS Module
import { useDataContext } from '../../../context/DataContext'
import { useNavigate } from 'react-router-dom'

const API_BASE_URL = 'http://localhost:5185/api/news'

const AddNews = () => {
    const navigate = useNavigate()
    const { setNewsTitle, setNewsContent, setNewsEmployeeId, employees, setEmployees } = useDataContext()
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        employeeId: '',
        status: 'Active',
    })

    const [isPreviewVisible, setIsPreviewVisible] = useState(true) // Thêm state để quản lý trạng thái preview

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const employeeResponse = await getAllEmployees()
                console.log(employeeResponse.data);
                setEmployees(employeeResponse.data)
            } catch (error) {
                console.error('Error fetching employees', error)
            }
        }

        fetchEmployees()
    }, [setEmployees])

    // Hàm này sẽ giúp bạn lấy các ảnh base64 từ content
    const extractImagesFromContent = (htmlContent) => {
        const tempDiv = document.createElement("div")
        tempDiv.innerHTML = htmlContent
        const imgTags = tempDiv.getElementsByTagName("img")
        const imageFiles = []

        for (let img of imgTags) {
            if (img.src.startsWith("data:image")) {
                imageFiles.push(img.src)
            }
        }

        return imageFiles
    }
    const handleBack = () => {
        navigate(-1)
    }

    // Hàm xử lý khi người dùng submit form
    const handleSubmit = async (values) => {
        let updatedContent = values.content
        const images = extractImagesFromContent(values.content)

        // Nếu có ảnh, thay thế đường dẫn base64 vào content
        for (let base64Image of images) {
            updatedContent = updatedContent.replace(base64Image, base64Image) // Đảm bảo base64 vẫn được giữ nguyên
        }

        const formData = new FormData()
        formData.append("title", values.title)
        formData.append("content", updatedContent)
        formData.append("employeeId", values.employeeId)
        formData.append('status', values.status)

        try {
            const response = await axios.post(API_BASE_URL, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })

            // Cập nhật giá trị vào DataContext
            setNewsTitle(values.title)
            setNewsContent(updatedContent)
            setNewsEmployeeId(values.employeeId)

            alert('News added successfully') // Thông báo thêm thành công
        } catch (error) {
            console.error("Error adding news:", error)
        }
    }

    // Xác thực schema sử dụng Yup
    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        content: Yup.string().required('Content is required'),
        employeeId: Yup.string().required('Employee selection is required'),
    })

    return (
        <div className={styles.addNewsContainer}>
            <div className={styles.addNewsContainer}>
                <h1 className={styles.addNewsTitle}>Add News</h1>

                <div className={styles.buttonContainer}>
                    <button onClick={handleBack} className="btn btn-outline-dark mb-4">
                        Back
                    </button>
                    <button
                        onClick={() => setIsPreviewVisible(!isPreviewVisible)}
                        className={styles.togglePreviewButton}
                    >
                        {isPreviewVisible ? 'Show Preview' : 'Hide Preview'}
                    </button>
                </div>
            </div>
            <div className={styles.formContainer}>
                <div className={styles.inputForm}>
                    <Formik
                        initialValues={formData}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            handleSubmit(values)
                            setFormData(values) // Lưu lại giá trị form để cập nhật bảng preview
                        }}
                    >
                        {({ setFieldValue, values, errors, touched }) => (
                            <Form className={styles.addNewsForm}>
                                <div className={styles.inputGroup}>
                                    <Field
                                        type="text"
                                        name="title"
                                        className={styles.titleInput}
                                        placeholder="Title"
                                        onChange={(e) => {
                                            setFieldValue("title", e.target.value);
                                            setFormData((prev) => ({ ...prev, title: e.target.value }));
                                        }}
                                    />
                                    <ErrorMessage name="title" component="div" className={styles.errorText} />
                                </div>

                                <div className={styles.editorGroup}>
                                    <SunEditor
                                        value={values.content}
                                        onChange={(content) => {
                                            setFieldValue('content', content);
                                            setFormData((prev) => ({ ...prev, content }));
                                        }}
                                        setOptions={{
                                            height: 500,
                                            buttonList: [
                                                ['bold', 'italic', 'underline', 'strike'],
                                                ['image', 'video', 'link'],
                                                ['fullScreen', 'codeView'],
                                            ],
                                        }}
                                    />
                                    <ErrorMessage name="content" component="div" className={styles.errorText} />
                                </div>

                                <div className={styles.selectGroup}>
                                    <Field as="select" name="employeeId" className={styles.employeeSelect}
                                        onChange={(e) => {
                                            setFieldValue('employeeId', e.target.value);
                                            setFormData((prev) => ({ ...prev, employeeId: e.target.value }));
                                        }}>
                                        <option value="">Select Employee</option>
                                        {employees.map((employee) => (
                                            <option key={employee.employeeId} value={employee.employeeId}>
                                                {employee.fullName}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="employeeId" component="div" className={styles.errorText} />
                                </div>
                                <div className={`${styles.checkboxWrapper} mb-3`}>
                                    <div className="d-flex align-items-center">
                                        <Field
                                            type="checkbox"
                                            name="status"
                                            className={`${styles.checkbox} ${values.status ? styles.checkboxChecked : ''}`}
                                            onChange={() => {
                                                setFieldValue('status', !values.status);
                                                setFormData((prev) => ({ ...prev, status: !values.status }));
                                            }}
                                        />
                                        <label htmlFor="status" className={styles.checkboxLabel}>
                                            Active
                                        </label>
                                    </div>
                                    <ErrorMessage name="status" component="div" className="text-danger" />
                                </div>
                                <button type="submit" className={styles.togglePreviewButton}>Add News</button>
                            </Form>
                        )}
                    </Formik>
                </div>

                {!isPreviewVisible && (
                    <div
                        className={`${styles.previewContainer} ${isPreviewVisible ? styles.previewContainerVisible : ''}`}
                    >
                        <h2>Preview News</h2>
                        <div className={styles.previewContent}>
                            <p><strong>Title:</strong> {formData.title}</p>

                            <p><strong>Content:</strong></p>
                            <div className="previewContent" dangerouslySetInnerHTML={{ __html: formData.content }} />

                            <p><strong>Employee:</strong> {
                                formData.employeeId && employees.find(emp => emp.employeeId === parseInt(formData.employeeId))?.fullName
                            }</p>
                            <p>
                                <strong>Status:</strong> {formData.status ? 'Active' : 'Inactive'}
                            </p>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default AddNews
