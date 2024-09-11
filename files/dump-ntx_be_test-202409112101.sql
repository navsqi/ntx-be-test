--
-- PostgreSQL database dump
--

-- Dumped from database version 13.16
-- Dumped by pg_dump version 13.16

-- Started on 2024-09-11 21:01:26 WIB

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.surveys DROP CONSTRAINT "surveys_userId_fkey";
ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
ALTER TABLE ONLY public.users DROP CONSTRAINT users_digits_key;
ALTER TABLE ONLY public.surveys DROP CONSTRAINT surveys_pkey;
ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.surveys ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE public.users_id_seq;
DROP TABLE public.users;
DROP TABLE public.threat_map;
DROP SEQUENCE public.surveys_id_seq;
DROP TABLE public.surveys;
DROP SCHEMA public;
--
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- TOC entry 3306 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 203 (class 1259 OID 16813)
-- Name: surveys; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.surveys (
    id integer NOT NULL,
    "values" integer[],
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer
);


--
-- TOC entry 202 (class 1259 OID 16811)
-- Name: surveys_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.surveys_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3307 (class 0 OID 0)
-- Dependencies: 202
-- Name: surveys_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.surveys_id_seq OWNED BY public.surveys.id;


--
-- TOC entry 204 (class 1259 OID 16827)
-- Name: threat_map; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.threat_map (
    "sourceCountry" text,
    "destinationCountry" text,
    millisecond bigint,
    type text,
    weight text,
    "attackTime" timestamp with time zone DEFAULT now() NOT NULL
);


--
-- TOC entry 201 (class 1259 OID 16795)
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    digits character varying(155),
    "fotoUrl" character varying(255),
    "workType" character varying(100),
    "positionTitle" character varying(100),
    lat double precision,
    lon double precision,
    company character varying(155),
    "isLogin" boolean,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    dovote boolean DEFAULT false,
    dosurvey boolean DEFAULT false,
    dofeedback boolean DEFAULT false,
    fullname character varying(255),
    "cuurentLeave" integer,
    password character varying(255),
    username character varying(255),
    role character varying(255)
);


--
-- TOC entry 200 (class 1259 OID 16793)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3308 (class 0 OID 0)
-- Dependencies: 200
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3157 (class 2604 OID 16816)
-- Name: surveys id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.surveys ALTER COLUMN id SET DEFAULT nextval('public.surveys_id_seq'::regclass);


--
-- TOC entry 3151 (class 2604 OID 16798)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3299 (class 0 OID 16813)
-- Dependencies: 203
-- Data for Name: surveys; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.surveys VALUES (1, '{100,100,90,90,100}', '2022-12-22 08:56:50.696+07', '2022-12-22 08:56:50.696+07', 1);
INSERT INTO public.surveys VALUES (2, '{90,100,100,80,90}', '2022-12-22 09:08:50.908+07', '2022-12-22 09:08:50.908+07', 2);
INSERT INTO public.surveys VALUES (3, '{80,80,80,80,80}', '2022-12-22 21:05:32.317+07', '2022-12-22 21:05:32.317+07', 3);
INSERT INTO public.surveys VALUES (4, '{100,200,300,400}', '2024-09-09 17:04:12.686+07', '2024-09-09 17:04:12.686+07', 3);
INSERT INTO public.surveys VALUES (5, '{100,200,300,400}', '2024-09-09 17:05:02.361+07', '2024-09-09 17:05:02.361+07', 3);
INSERT INTO public.surveys VALUES (6, '{100,200,300,400}', '2024-09-09 17:05:30.29+07', '2024-09-09 17:05:30.29+07', 3);
INSERT INTO public.surveys VALUES (7, '{100,200,300,400}', '2024-09-09 17:07:09.685+07', '2024-09-09 17:07:09.685+07', 3);
INSERT INTO public.surveys VALUES (8, '{100,200,300,400}', '2024-09-09 17:08:16.288+07', '2024-09-09 17:08:16.288+07', 3);
INSERT INTO public.surveys VALUES (9, '{100,200,300,400}', '2024-09-09 17:08:37.1+07', '2024-09-09 17:08:37.1+07', 3);
INSERT INTO public.surveys VALUES (10, '{100,200,300,400}', '2024-09-09 17:09:05.585+07', '2024-09-09 17:09:05.585+07', 3);
INSERT INTO public.surveys VALUES (11, '{100,200,300,400}', '2024-09-10 11:59:24.262+07', '2024-09-10 11:59:24.262+07', 3);
INSERT INTO public.surveys VALUES (12, '{100,200,300,400}', '2024-09-10 11:59:25.74+07', '2024-09-10 11:59:25.74+07', 3);
INSERT INTO public.surveys VALUES (13, '{100,200,300,400}', '2024-09-11 11:32:00.103+07', '2024-09-11 11:32:00.103+07', 3);
INSERT INTO public.surveys VALUES (14, '{100,200,300,400}', '2024-09-11 11:32:23.191+07', '2024-09-11 11:32:23.191+07', 3);
INSERT INTO public.surveys VALUES (15, '{100,200,300,400}', '2024-09-11 17:40:58.388+07', '2024-09-11 17:40:58.388+07', 3);


--
-- TOC entry 3300 (class 0 OID 16827)
-- Dependencies: 204
-- Data for Name: threat_map; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.threat_map VALUES ('NL', 'IN', 486, 'webAttackers', 'Light', '2024-09-10 03:27:43.486667+07');
INSERT INTO public.threat_map VALUES ('NL', 'IL', 490, 'webAttackers', 'Light', '2024-09-10 03:27:43.49+07');
INSERT INTO public.threat_map VALUES ('US', 'AU', 496, 'webAttackers', 'Light', '2024-09-10 03:27:43.496667+07');
INSERT INTO public.threat_map VALUES ('GB', 'IN', 523, 'webAttackers', 'Light', '2024-09-10 03:27:43.523333+07');
INSERT INTO public.threat_map VALUES ('NL', 'IL', 533, 'webAttackers', 'Light', '2024-09-10 03:27:43.533333+07');
INSERT INTO public.threat_map VALUES ('US', 'AU', 536, 'webAttackers', 'Light', '2024-09-10 03:27:43.536667+07');
INSERT INTO public.threat_map VALUES ('US', 'IN', 546, 'webAttackers', 'Light', '2024-09-10 03:27:43.546667+07');
INSERT INTO public.threat_map VALUES ('US', 'IL', 556, 'webAttackers', 'Light', '2024-09-10 03:27:43.556667+07');
INSERT INTO public.threat_map VALUES ('US', 'AU', 560, 'webAttackers', 'Light', '2024-09-10 03:27:43.56+07');
INSERT INTO public.threat_map VALUES ('NL', 'IN', 570, 'webAttackers', 'Light', '2024-09-10 03:27:43.57+07');
INSERT INTO public.threat_map VALUES ('NL', 'IL', 586, 'webAttackers', 'Light', '2024-09-10 03:27:43.586667+07');
INSERT INTO public.threat_map VALUES ('US', 'AU', 606, 'webAttackers', 'Light', '2024-09-10 03:27:43.606667+07');
INSERT INTO public.threat_map VALUES ('ID', 'US', 606, 'webAttackers', 'Light', '2024-09-10 03:27:43.606667+07');


--
-- TOC entry 3297 (class 0 OID 16795)
-- Dependencies: 201
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (2, 'HTA', '', 'WFH', NULL, 0, 0, 'NTX', true, '2021-12-15 15:06:33+07', '2022-12-22 15:04:01.302+07', true, true, false, 'R. Hernanta Subagya', 0, '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', 'user2', 'MARKETINGOFFICER');
INSERT INTO public.users VALUES (1, 'DFA', '', 'WFO', NULL, 0, 0, 'NTX', true, '2021-12-15 15:06:33+07', '2022-12-22 21:05:32.377+07', true, true, false, 'M. Daffa Quraisy', 0, '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', 'user1', 'SUPERADMIN');
INSERT INTO public.users VALUES (3, 'HFW', '', 'WFO', NULL, 0, 0, 'NTX', true, '2021-12-15 15:06:33.226343+07', '2022-12-22 15:03:46.848+07', true, true, false, 'Hafidz Wibowo', 0, '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', 'user3', 'KEPALACABANG');


--
-- TOC entry 3309 (class 0 OID 0)
-- Dependencies: 202
-- Name: surveys_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.surveys_id_seq', 15, true);


--
-- TOC entry 3310 (class 0 OID 0)
-- Dependencies: 200
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- TOC entry 3164 (class 2606 OID 16821)
-- Name: surveys surveys_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.surveys
    ADD CONSTRAINT surveys_pkey PRIMARY KEY (id);


--
-- TOC entry 3160 (class 2606 OID 16810)
-- Name: users users_digits_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_digits_key UNIQUE (digits);


--
-- TOC entry 3162 (class 2606 OID 16808)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3165 (class 2606 OID 16822)
-- Name: surveys surveys_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.surveys
    ADD CONSTRAINT "surveys_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2024-09-11 21:01:26 WIB

--
-- PostgreSQL database dump complete
--

