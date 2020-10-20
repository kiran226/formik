import React from 'react'
import { Formik,Form,Field,ErrorMessage } from 'formik';
import * as Yup from 'yup';

const initialValues={
    name:'',
    email:'',
    channel:'',
};
// const validate= values =>{
//     let errors={};
//     if(!values.name){
//         errors.name="Required";
//     }
//     if(!values.email){
//         errors.email="Required";
//     }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
//         errors.email="Invalid email format"
//     }
//     if(!values.channel){
//         errors.channel="Required"
//     }
// return errors    
// };

const validationSchema = Yup.object({
    name : Yup.string().required("Required"),
    email : Yup.string().email("Invalid email format").required("Required"),
    channel : Yup.string().required("Required")
})
const onSubmit = values =>{
    console.log("Form Data", values);
}
export const YouTubeForm = () => {
    // console.log("form values", formik.values);
    // console.log("form errors", formik.errors);
    // console.log("Visited Fields",formik.touched);
    return (
        <Formik initialValues={initialValues}
         validationSchema={validationSchema}
         onSubmit={onSubmit}
        >
        <Form>
        <div className="form-control">
            <label htmlFor="name">Name</label>
            <Field type="text" id="name" name="name"/>
            <ErrorMessage name='name'/>
        </div>
        <div className="form-control">
            <label htmlFor="email">Email</label>
            <Field type="email" id="email" name="email"/>
            <ErrorMessage name='email' />
        </div>
        <div className="form-control">
            <label htmlFor="channel">channel</label>
            <Field type="text" id="channel" name="channel" />
            <ErrorMessage name="channel" />
        </div>
        <button type="submit">Submit</button>  
        </Form>
        </Formik>
    )
}
