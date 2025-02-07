/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'
import axios from 'axios'
import { getAllEmployees } from '../../../services/employeeService'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import styles from '../../../style/ManStyle.module.css' // Import CSS Module
import { useNavigate, useParams } from 'react-router-dom'
import { useDataContext } from '../../../context/DataContext'

const API_BASE_URL = 'http://localhost:5185/api/news'

const EditNews = () => {
    const navigate = useNavigate()
    const { newsId } = useParams()
    const { setNewsTitle, setNewsContent, setNewsEmployeeId, employees, setEmployees } = useDataContext()
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        employeeId: '',
        status: false,
    })
    const [isPreviewVisible, setIsPreviewVisible] = useState(true)

    useEffect(() => {
        const fetchNewsAndEmployees = async () => {
            try {
                const newsResponse = await axios.get(`${API_BASE_URL}/${newsId}`)
                const employeeResponse = await getAllEmployees()

                console.log(newsResponse.data)
                console.log(employeeResponse.data)

                setFormData({
                    title: newsResponse.data.title,
                    content: newsResponse.data.content,
                    employeeId: newsResponse.data.employeeId,
                    status: newsResponse.data.status || false,
                })

                setEmployees(employeeResponse.data)
            } catch (error) {
                console.error('Error fetching news or employees:', error)
            }
        }

        fetchNewsAndEmployees()
    }, [newsId])

    // Extract images from content (for base64 handling)
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

    const handleSubmit = async (values) => {
        let updatedContent = values.content
        const images = extractImagesFromContent(values.content)

        // If there are images, keep base64 data intact
        for (let base64Image of images) {
            updatedContent = updatedContent.replace(base64Image, base64Image)
        }

        const formData = new FormData()
        formData.append('title', values.title)
        formData.append('content', updatedContent)
        formData.append('employeeId', values.employeeId)
        formData.append('status', values.status)

        try {
            const response = await axios.put(`${API_BASE_URL}/${newsId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })

            console.log('Response from update:', response)

            setFormData({
                title: values.title,
                content: updatedContent,
                employeeId: values.employeeId,
                status: values.status,
            })

            alert('News updated successfully')
            navigate('/admin/NewsList')
        } catch (error) {
            console.error('Error updating news:', error)
            alert('Error updating news')
        }
    }

    // Validation Schema using Yup
    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        content: Yup.string().required('Content is required'),
        employeeId: Yup.string().required('Employee selection is required'),
        status: Yup.boolean().required('Status is required'),
    })

    return (
        <div className={styles.addNewsContainer}>
            <div className={styles.addNewsContainer}>
                <h1 className={styles.addNewsTitle}>Edit News</h1>

                <div className={styles.buttonContainer}>
                    <button onClick={() => navigate(-1)} className="btn btn-outline-dark mb-4">
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
                        initialValues={formData}  // Khởi tạo giá trị ban đầu
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            handleSubmit(values)
                            setFormData(values) // Lưu lại giá trị form để cập nhật bảng preview
                        }}
                        enableReinitialize  // Đảm bảo rằng Formik sẽ tái khởi tạo khi formData thay đổi
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
                                        value={values.title}
                                    />
                                    <ErrorMessage name="title" component="div" className={styles.errorText} />
                                </div>

                                <div className={styles.editorGroup}>
                                    <SunEditor
                                        setContents={values.content} // Đảm bảo truyền giá trị content từ Formik
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
                                    <Field
                                        as="select"
                                        name="employeeId"
                                        className={styles.employeeSelect}
                                        value={values.employeeId}
                                        onChange={(e) => {
                                            setFieldValue('employeeId', e.target.value);
                                            setFormData((prev) => ({ ...prev, employeeId: e.target.value }));
                                        }}
                                    >
                                        <option value="">Select Employee</option>
                                        {employees.map((employee) => (
                                            <option key={employee.employeeId} value={employee.employeeId.toString()}>
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

                                <button type="submit" className={styles.togglePreviewButton}>
                                    Update News
                                </button>
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

export default EditNews
