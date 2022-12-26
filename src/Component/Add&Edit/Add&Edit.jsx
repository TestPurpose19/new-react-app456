import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useParams } from "react-router-dom";

const Add = () => {
  const [edited, setEdited] = useState({
    id: "",
    name: "",
    email: "",
  });
  //console.log(edited);
  const params = useParams();
  //console.log(params);

  //EDIT*******////
  useEffect(() => {
    //console.log(params.id);
    async function foo() {
      const response = await axios.get(
        `https://63209503e3bdd81d8efdb0f9.mockapi.io/student/${params.id}`
      );
      //console.log(response.data.name);
      setEdited(response.data);
    }
    foo();
  }, []);
  console.log(edited);

  let Formik = useFormik({
    initialValues: edited,
    onSubmit: async (values, edited) => {
      try {
        const response = await axios.post(
          `https://63209503e3bdd81d8efdb0f9.mockapi.io/student`,
          {
            ...values,
          }
        );
      } catch (error) {
        console.log(error);
      }
      try {
        const response = await axios.put(
          `https://63209503e3bdd81d8efdb0f9.mockapi.io/student/edit/${params.id}`,
          {
            name: edited.name,
            email: edited.email,
          }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },

    validate: (values) => {
      var errors = {};
      if (values.name === "") errors.name = "name is required";
      if (values.email === "") errors.email = "email is required";
      return errors;
    },
  });

  return (
    <div>
      <form onSubmit={Formik.handleSubmit}>
        <input
          id="name"
          name="name"
          type="text"
          value={Formik.values.name}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          placeholder="name"
          //defaultValue={edited.name}
        />
        <br />
        <span style={{ color: "red" }}>
          {Formik.touched.name && Formik.errors.name}
        </span>
        <input
          id="email"
          name="email"
          type="text"
          value={Formik.values.email}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          placeholder="email"
          //defaultValue={edited.email}
        />
        <span style={{ color: "red" }}>
          {Formik.touched.email && Formik.errors.email}
        </span>
        <br />
        <button type="submit"> click me</button>
      </form>
    </div>
  );
};

export default Add;
