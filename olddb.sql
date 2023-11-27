-- public.marca_cn_contratacion definition

-- Drop table

-- DROP TABLE public.marca_cn_contratacion;

CREATE TABLE public.marca_cn_contratacion (
	marca_cn_pk uuid NOT NULL DEFAULT uuid_generate_v4(),
	cn_nombre varchar(20) NOT NULL,
	cn_estado public."marca_cn_contratacion_tipc_estado_enum" NOT NULL DEFAULT 'ACTIVE'::marca_cn_contratacion_tipc_estado_enum,
	cn_feccrea timestamp NOT NULL DEFAULT now(),
	cn_fecmod timestamp NOT NULL DEFAULT now(),
	cn_usrcrea text NOT NULL,
	cn_usrmod text NOT NULL,
	CONSTRAINT "PK_03bb8f864fb2c612bdf9972b3c9" PRIMARY KEY (marca_cn_pk)
);


-- public.marca_gen_genero definition

-- Drop table

-- DROP TABLE public.marca_gen_genero;

CREATE TABLE public.marca_gen_genero (
	marca_gen_pk uuid NOT NULL DEFAULT uuid_generate_v4(),
	gen_nombre varchar(20) NOT NULL,
	gen_estado public."marca_gen_genero_gen_estado_enum" NOT NULL DEFAULT 'ACTIVE'::marca_gen_genero_gen_estado_enum,
	gen_feccrea timestamp NOT NULL DEFAULT now(),
	gen_fecmod timestamp NOT NULL DEFAULT now(),
	gen_usrcrea text NOT NULL,
	gen_usrmod text NOT NULL,
	CONSTRAINT "PK_8e287ecc14ee1308b64e237135b" PRIMARY KEY (marca_gen_pk)
);


-- public.marca_ubi_ubicacion definition

-- Drop table

-- DROP TABLE public.marca_ubi_ubicacion;

CREATE TABLE public.marca_ubi_ubicacion (
	marca_ubi_pk uuid NOT NULL DEFAULT uuid_generate_v4(),
	ubi_nombre varchar(50) NOT NULL,
	ubi_estado public."marca_ubi_ubicacion_ubi_estado_enum" NOT NULL DEFAULT 'ACTIVE'::marca_ubi_ubicacion_ubi_estado_enum,
	ubi_feccrea timestamp NOT NULL DEFAULT now(),
	ubi_fecmod timestamp NOT NULL DEFAULT now(),
	ubi_usrcrea text NOT NULL,
	ubi_usrmod text NOT NULL,
	CONSTRAINT "PK_7b7deb672acc91ad4fc60414026" PRIMARY KEY (marca_ubi_pk)
);


-- public.marca_usr_usuario definition

-- Drop table

-- DROP TABLE public.marca_usr_usuario;

CREATE TABLE public.marca_usr_usuario (
	marca_usr_pk uuid NOT NULL DEFAULT uuid_generate_v4(),
	usr_codigo varchar(20) NOT NULL,
	usr_nombres varchar(50) NOT NULL,
	usr_apellidos varchar(50) NOT NULL,
	usr_contrasenia text NOT NULL,
	usr_estado public."marca_usr_usuario_usr_estado_enum" NOT NULL DEFAULT 'ACTIVE'::marca_usr_usuario_usr_estado_enum,
	usr_feccrea timestamp NOT NULL DEFAULT now(),
	usr_fecmod timestamp NOT NULL DEFAULT now(),
	usr_usrcrea text NOT NULL,
	usr_usrmod text NOT NULL,
	CONSTRAINT "PK_dcb4909847341286c475c02cb3c" PRIMARY KEY (marca_usr_pk),
	CONSTRAINT "UQ_756e8780a71a3303b9aab7ac446" UNIQUE (usr_codigo)
);


-- public.marca_emp_empleados definition

-- Drop table

-- DROP TABLE public.marca_emp_empleados;

CREATE TABLE public.marca_emp_empleados (
	marca_emp_pk uuid NOT NULL DEFAULT uuid_generate_v4(),
	emp_codigo varchar(12) NOT NULL,
	emp_fecha_nacimiento timestamp NOT NULL,
	emp_nombres varchar(50) NOT NULL,
	emp_apellidos varchar(50) NOT NULL,
	emp_estado public."marca_emp_empleados_emp_estado_enum" NOT NULL DEFAULT 'ACTIVE'::marca_emp_empleados_emp_estado_enum,
	marca_emp_empre_fk text NOT NULL,
	emp_feccrea timestamp NOT NULL DEFAULT now(),
	emp_fecmod timestamp NOT NULL DEFAULT now(),
	emp_usrcrea text NOT NULL,
	emp_usrmod text NOT NULL,
	marca_emp_gen_fk uuid NULL,
	marca_emp_ubi_fk uuid NULL,
	marca_emp_cn_fk uuid NULL,
	CONSTRAINT "PK_c3d65c209b124e9f0dc2a6a52c0" PRIMARY KEY (marca_emp_pk),
	CONSTRAINT "FK_0328b28a8aa978ca0a0542e788d" FOREIGN KEY (marca_emp_gen_fk) REFERENCES public.marca_gen_genero(marca_gen_pk) ON DELETE CASCADE,
	CONSTRAINT "FK_46186f28160d77952341db303b0" FOREIGN KEY (marca_emp_ubi_fk) REFERENCES public.marca_ubi_ubicacion(marca_ubi_pk) ON DELETE CASCADE,
	CONSTRAINT "FK_6f1709601d770a6c6e56d6a013a" FOREIGN KEY (marca_emp_cn_fk) REFERENCES public.marca_cn_contratacion(marca_cn_pk) ON DELETE CASCADE
);


-- public.marca_empre_empresas definition

-- Drop table

-- DROP TABLE public.marca_empre_empresas;

CREATE TABLE public.marca_empre_empresas (
	marca_empre_pk uuid NOT NULL DEFAULT uuid_generate_v4(),
	empre_nombre varchar(50) NOT NULL,
	empre_direccion text NOT NULL,
	empre_contacto_nombre text NOT NULL,
	empre_contacto_correo text NOT NULL,
	empre_contacto_telefono text NOT NULL,
	empre_estado public."marca_empre_empresas_empre_estado_enum" NOT NULL DEFAULT 'ACTIVE'::marca_empre_empresas_empre_estado_enum,
	empre_feccrea timestamp NOT NULL DEFAULT now(),
	empre_fecmod timestamp NOT NULL DEFAULT now(),
	empre_usrcrea text NOT NULL,
	empre_usrmod text NOT NULL,
	marca_empre_usr_fk uuid NULL,
	CONSTRAINT "PK_4829db00edc2e6c572dc4556307" PRIMARY KEY (marca_empre_pk),
	CONSTRAINT "FK_c019f853d72edca54a707ef1f4d" FOREIGN KEY (marca_empre_usr_fk) REFERENCES public.marca_usr_usuario(marca_usr_pk) ON DELETE CASCADE
);


-- public.marca_proy_proyecto definition

-- Drop table

-- DROP TABLE public.marca_proy_proyecto;

CREATE TABLE public.marca_proy_proyecto (
	marca_proy_pk uuid NOT NULL DEFAULT uuid_generate_v4(),
	proy_nombre varchar(50) NOT NULL,
	proy_numero_contrato text NOT NULL,
	proy_fecha_inicio timestamp NOT NULL,
	proy_fecha_fin timestamp NOT NULL,
	proy_estado public."marca_proy_proyecto_proy_estado_enum" NOT NULL DEFAULT 'ACTIVE'::marca_proy_proyecto_proy_estado_enum,
	proy_feccrea timestamp NOT NULL DEFAULT now(),
	proy_fecmod timestamp NOT NULL DEFAULT now(),
	proy_usrcrea text NOT NULL,
	proy_usrmod text NOT NULL,
	marca_proy_empre_fk uuid NULL,
	CONSTRAINT "PK_5ae374e06b3c5cec5694ecaf7fa" PRIMARY KEY (marca_proy_pk),
	CONSTRAINT "FK_07d09bc57e4859b600a01adcb51" FOREIGN KEY (marca_proy_empre_fk) REFERENCES public.marca_empre_empresas(marca_empre_pk) ON DELETE CASCADE
);


-- public.marca_asig_asignacion definition

-- Drop table

-- DROP TABLE public.marca_asig_asignacion;

CREATE TABLE public.marca_asig_asignacion (
	marca_asig_pk uuid NOT NULL DEFAULT uuid_generate_v4(),
	asig_hora_inicio time NOT NULL,
	asig_hora_fin time NOT NULL,
	proy_estado public."marca_asig_asignacion_proy_estado_enum" NOT NULL DEFAULT 'ACTIVE'::marca_asig_asignacion_proy_estado_enum,
	asig_feccrea timestamp NOT NULL DEFAULT now(),
	asig_fecmod timestamp NOT NULL DEFAULT now(),
	asig_usrcrea text NOT NULL,
	asig_usrmod text NOT NULL,
	marca_asig_proy_fk uuid NULL,
	marca_asig_emp_fk uuid NULL,
	CONSTRAINT "PK_523c20092a10d306e0aeca418e4" PRIMARY KEY (marca_asig_pk),
	CONSTRAINT "FK_cc6d70250b704b6aff5a8c86cc4" FOREIGN KEY (marca_asig_proy_fk) REFERENCES public.marca_proy_proyecto(marca_proy_pk) ON DELETE CASCADE,
	CONSTRAINT "FK_fa01bc19ce8f59a24063131e009" FOREIGN KEY (marca_asig_emp_fk) REFERENCES public.marca_emp_empleados(marca_emp_pk) ON DELETE CASCADE
);


-- public.marca_his_historial definition

-- Drop table

-- DROP TABLE public.marca_his_historial;

CREATE TABLE public.marca_his_historial (
	marca_his_pk uuid NOT NULL DEFAULT uuid_generate_v4(),
	his_marca timestamp NOT NULL,
	emp_estado public."marca_his_historial_emp_estado_enum" NOT NULL DEFAULT 'ACTIVE'::marca_his_historial_emp_estado_enum,
	marca_his_usr_fk text NOT NULL,
	his_feccrea timestamp NOT NULL DEFAULT now(),
	his_fecmod timestamp NOT NULL DEFAULT now(),
	his_usrcrea text NOT NULL,
	his_usrmod text NOT NULL,
	marca_his_asig_fk uuid NULL,
	CONSTRAINT "PK_d813691d43cc537021929756dde" PRIMARY KEY (marca_his_pk),
	CONSTRAINT "FK_9c88e2542cef67525f727690866" FOREIGN KEY (marca_his_asig_fk) REFERENCES public.marca_asig_asignacion(marca_asig_pk) ON DELETE CASCADE
);