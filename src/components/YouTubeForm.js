import React from 'react'
import { Formik,Form,Field,ErrorMessage,FieldArray } from 'formik';
import * as Yup from 'yup';
import { TextError } from './TextError';

const initialValues={
    name:'',
    email:'',
    channel:'',
    comments:'',
    address :'',
    social :{
        facebook :'',
        twitter :''
    },
    phoneNumbers:['',''],
    phNumbers:['']
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
            <ErrorMessage name='name' component={TextError}/>
        </div>
        <div className="form-control">
            <label htmlFor="email">Email</label>
            <Field type="email" id="email" name="email"/>
            <ErrorMessage name='email'>
                {/* render props pattern */}
                {(errorMes)=>{
                   return( <div className="error">{errorMes}</div> )
                }}
            </ErrorMessage>
        </div>
        <div className="form-control">
            <label htmlFor="channel">channel</label>
            <Field type="text" id="channel" name="channel" placeholder="YouTube channel name"/>
            <ErrorMessage name="channel" />
        </div>
        <div className="form-control">
            <label htmlFor="commetns">Comments</label>
            <Field as="textarea" id="comments" name="comments"/>
        </div>
        <div className="form-control">
        {/* render props pattern */}
            <label htmlFor="address">Address</label>
            <Field name="address">
                {
                    (props)=>{
                        const {field,form,meta}=props;
                        console.log("Render props", props);
                        return (<div>
                                 <input type="text" id="address" {...field}/>
                                 {meta.touched && meta.error ? <div>{meta.error}</div>: null }
                                </div>)
                    }
                }
            </Field>
        </div>
        <div className="form-control">
            <label htmlFor="facebook">Facebook</label>
            <Field type="text" id="facebook" name="social.facebook"/>
        </div>
        <div className="form-control">
            <label htmlFor="twitter">Twitter</label>
            <Field type="text" id="twitter" name="social.twitter"/>
        </div>
        <div className="form-control">
            <label htmlFor="Primary Ph">Primary PhoneNumber</label>
            <Field type="text" id="primaryPh" name="phoneNumbers[0]"/>
        </div>
        <div className="form-control">
            <label htmlFor="Secondary Ph">Secondary PhoneNumber</label>
            <Field type="text" id="SecondaryPh" name="phoneNumbers[1]"/>
        </div>

        <div className="form-control">
            <label>List of Phone Numbers</label>
            <FieldArray name="phNumbers">
                {
                    (fieldArrayProps)=>{
                        const {push,remove,form}= fieldArrayProps;
                        const {values} = form;
                        const {phNumbers}= values;
                        console.log("Field Array Props", fieldArrayProps);
                        return(
                            <div>
                                {phNumbers.map((phNumber,index)=>(
                                        <div key={index}>
                                        <Field name={`phNumbers[${index}]`}/>
                                        {index>0 &&
                                            <button type="button" onClick={()=>remove(index)}>-</button>
                                         }
                                        <button type="button" onClick={()=>push(``)}>+</button>
                                        </div>
                                    )
                                )}
                            </div>
                        )
                    }
                }
            </FieldArray>
        </div>

        <button type="submit">Submit</button>  
        </Form>
        </Formik>
    )
}
