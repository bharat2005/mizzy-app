import { View, Text, Alert, Dimensions } from "react-native";
import React from "react";
import { Button, HelperText, TextInput } from "react-native-paper";
import * as Yup from "yup";
import { useAuth } from '../../../contexts/AuthContextProvider'
import { Formik } from "formik";
import { TouchableWithoutFeedback } from "react-native";
import Colors from "../../../constants/Colors";

const LogInForm = () => {
    const {login} = useAuth()
  const validation = Yup.object({
    email: Yup.string().email("Should be a vlaid email*").required("Required*"),
    password: Yup.string()
      .min(6, "should be atleadst 6 char*")
      .required("Required*"),
  });


  const handleRegister = async (values, {resetForm}) => {
        await login(values.email, values.password)
        resetForm()
  }

  return (
    <View style={{ width: Dimensions.get('screen').width * 0.8, gap: 12, marginTop:18 }}>
      <Formik
        initialValues={{  email: "", password: "" }}
        onSubmit={async(values, helpers) => await handleRegister(values, helpers)}
        validationSchema={validation}
      >
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          errors,
          isSubmitting,
          values,
          touched,
        }) => (
          <>

            <TextInput
                    placeholderTextColor='lightgray'
                          mode="outlined"
                          
                          theme={{
                            colors: {
                              primary: Colors.PINK,
                              background: Colors.LIGHTPINK,
                              outline: Colors.PINKSTROCK,
                            },
                            roundness: 12,
                            
                          }}
            value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              error={touched.email === true && !!errors.email}
              placeholder="email"
            />
            <HelperText
               style={{color:'red'}}
            
            visible={touched.email === true && !!errors.email}>
              {errors.email}
            </HelperText>

            <TextInput
            secureTextEntry
                    placeholderTextColor='lightgray'
                          mode="outlined"
                          
                          theme={{
                            colors: {
                              primary: Colors.PINK,
                              background: Colors.LIGHTPINK,
                              outline: Colors.PINKSTROCK,
                            },
                            roundness: 12,
                            
                          }}
            value={values.password}
              onBlur={handleBlur("password")}
              onChangeText={handleChange("password")}
              error={touched.password === true && !!errors.password}
              placeholder="password"
            />
            <HelperText
            style={{color:'red'}}
              visible={touched.password === true && !!errors.password}
            >
              {errors.password}
            </HelperText>

            <Button
                        buttonColor="black"
            contentStyle={{height:50}}
            style={{borderRadius:12, marginTop:18}}
            labelStyle={{fontFamily:'bold',fontSize:18}}
            
            
            disabled={isSubmitting} loading={isSubmitting} onPress={handleSubmit} mode="contained">
              Login
            </Button>
          </>
        )}
      </Formik>
    </View>
  );
};

export default LogInForm;
