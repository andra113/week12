import './App.css';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldInputProps, FormikProps } from 'formik';
import * as Yup from 'yup';
import { Button, Input, DatePicker } from 'antd';

const App = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const initialValues = {
    fullName: '',
    email: '',
    dob: '',
    street: '',
    city: '',
    country: '',
    username: '',
    password: '' as string,
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    dob: Yup.date().required('Required'),
    street: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    country: Yup.string().required('Required'),
    username: Yup.string().required('Required'),
    password: Yup.string()
      .required('Required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Required'),
  });

  const stepLabels = ['Personal Information', 'Address Information', 'Username and Password'];

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting, isValid, touched }) => (
        <Form>
          <h2>Step {currentStep}: {stepLabels[currentStep - 1]}</h2>
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <>
              <div>
                <label>Full Name:</label>
                <Field name="fullName" as={Input} />
                <ErrorMessage name="fullName" component="div" className="error-message" />
              </div>
              <div>
                <label>Email Address:</label>
                <Field name="email" as={Input} />
                <ErrorMessage name="email" component="div" className="error-message" />
              </div>
              <div>
                <label>Date of Birth:</label>
                <Field name="dob">
                  {({ field, form }: { field: FieldInputProps<never>; form: FormikProps<never> }) => (
                  <DatePicker
                    {...field}
                    format="YYYY-MM-DD"
                    onChange={(date) => form.setFieldValue(field.name, date)}
                  />
                )}
</Field>
              </div>
            </>
          )}

          {/* Step 2: Address Information */}
          {currentStep === 2 && (
            <>
              <div>
                <label>Street:</label>
                <Field name="street" as={Input} />
                <ErrorMessage name="street" component="div" className="error-message" />
              </div>
              <div>
                <label>City:</label>
                <Field name="city" as={Input} />
                <ErrorMessage name="city" component="div" className="error-message" />
              </div>
              <div>
                <label>Country:</label>
                <Field name="country" as={Input} />
                <ErrorMessage name="country" component="div" className="error-message" />
              </div>
            </>
          )}

          {/* Step 3: Username and Password */}
          {currentStep === 3 && (
            <>
              <div>
                <label>Username:</label>
                <Field name="username" as={Input} />
                <ErrorMessage name="username" component="div" className="error-message" />
              </div>
              <div>
                <label>Password:</label>
                <Field name="password" as={Input} type="password" />
                <ErrorMessage name="password" component="div" className="error-message" />
              </div>
              <div>
                <label>Confirm Password:</label>
                <Field name="confirmPassword" as={Input} type="password" />
                <ErrorMessage name="confirmPassword" component="div" className="error-message" />
              </div>
            </>
          )}

          {/* Navigation Buttons */}
          <div>
            {currentStep > 1 && (
              <Button type="default" onClick={handlePreviousStep}>
                Previous
              </Button>
            )}
            {currentStep < 3 && (
              <Button type="primary" onClick={handleNextStep}>
                Next
              </Button>
            )}
            {currentStep === 3 && (
              <>
                <Button type="primary" htmlType="submit" disabled={isSubmitting}>
                  Submit
                </Button>
                {(!isValid || Object.keys(touched).length === 0) && (
                  <div className="error-message">Please fill out all required fields correctly.</div>
                )}
              </>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default App;
