function initialValues() {
    return {
      email: "",
      password: "",
    };
  }
  function validationSchema() {
    return Yup.object({
      email: Yup.string()
        .email("El correo no es válido")
        .required("Este campo es requerido"),
      password: Yup.string().required("Este campo es requerido"),
    });
  }
  
  export const Login = () => {
    /* const onFinish = async (values) => {
      console.log('Received values of form: ', values);
      try{
        setError("");
        await authController.login(values);
    } catch (error) {
        setError("Error en el servidor con validación de formato de evolución");
    }
  }; */
  
    const [error, setError] = useState("");
    const formik = useFormik({
      initialValues: initialValues(),
      validationSchema: validationSchema(),
      validateOnChange: false,
      validateOnBlur: false,
      onSubmit: async (formValue) => {
        console.log(formValue);
        /*  await onFinish(formValue); */
        try {
          setError("");
          await authController.login(formValue);
        } catch (error) {
          setError("Error en el servidor con validación de formato de evolución");
        }
      },
    });
    return (
      <div>
        <FirstTop addtitle="Inicio Sesion" />
        <Form
          name="normal_login"
          layout="vertical"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          /*     onFinish={onFinish} */
          onSubmit={formik.handleSubmit}
        >
          <Form.Item>
            {/* <label className='my-label'>Correo electrónico</label> */}
            <Input
              name="email"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="cédula/correo electrónico"
              autoComplete="email"
              onBlur={formik.handleBlur}
              onChange={(e) => {
                formik.handleChange(e);
                console.log(e.target.value); // Imprimir en consola el valor ingresado
              }}
              value={formik.values.email}
              errormessage={formik.errors.email}
            />
          </Form.Item>
          {formik.errors.email && formik.touched.email && (
          <div>{formik.errors.email}</div>
        )}
          <Form.Item>
            {/* <label className='my-label'>Contraseña</label> */}
            <Input
              name="password"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Contraseña"
              autoComplete="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.errors.password} // Cambio realizado aquí
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={formik.isSubmitting}
            >
              Ingresar
            </Button>
          </Form.Item>
          {error && <p className="form-evolution__error">{error}</p>}
        </Form>
      </div>
    );
  };
  