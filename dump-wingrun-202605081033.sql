--
-- PostgreSQL database dump
--

\restrict wBhZh8PHfWQGtvT1cPRy7xdbiT9fTpa90Fik6fqfcg8cMu4ALg3xtp0CA27f1oW

-- Dumped from database version 18.3 (Postgres.app)
-- Dumped by pg_dump version 18.3 (Postgres.app)

-- Started on 2026-05-08 10:33:59 +04

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 877 (class 1247 OID 17858)
-- Name: Audience; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Audience" AS ENUM (
    'MEN',
    'WOMEN',
    'BOY',
    'GIRL'
);


ALTER TYPE public."Audience" OWNER TO postgres;

--
-- TOC entry 880 (class 1247 OID 17868)
-- Name: CategorySize; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."CategorySize" AS ENUM (
    'MEN',
    'WOMEN',
    'KIDS'
);


ALTER TYPE public."CategorySize" OWNER TO postgres;

--
-- TOC entry 883 (class 1247 OID 17876)
-- Name: DestinationGroup; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."DestinationGroup" AS ENUM (
    'METROPOLE',
    'DOM'
);


ALTER TYPE public."DestinationGroup" OWNER TO postgres;

--
-- TOC entry 889 (class 1247 OID 17892)
-- Name: OrderStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."OrderStatus" AS ENUM (
    'PENDING',
    'REJECT',
    'PAID'
);


ALTER TYPE public."OrderStatus" OWNER TO postgres;

--
-- TOC entry 886 (class 1247 OID 17882)
-- Name: ProductTag; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ProductTag" AS ENUM (
    'BEST_SELLER',
    'OUR_PICK',
    'NEW_ARRIVAL',
    'POPULAR'
);


ALTER TYPE public."ProductTag" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 17899)
-- Name: Account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Account" (
    id text NOT NULL,
    "accountId" text NOT NULL,
    "providerId" text NOT NULL,
    "userId" text NOT NULL,
    "accessToken" text,
    "refreshToken" text,
    "idToken" text,
    "accessTokenExpiresAt" timestamp(3) without time zone,
    "refreshTokenExpiresAt" timestamp(3) without time zone,
    scope text,
    password text,
    "createdAt" timestamp(3) without time zone NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Account" OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 17950)
-- Name: Address; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Address" (
    id integer NOT NULL,
    firstname text NOT NULL,
    lastname text NOT NULL,
    address text NOT NULL,
    address_2 text,
    city text NOT NULL,
    cp text NOT NULL,
    phone text NOT NULL,
    "isDefault" boolean NOT NULL,
    "userId" text NOT NULL,
    "destinationId" integer NOT NULL
);


ALTER TABLE public."Address" OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 17949)
-- Name: Address_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Address_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Address_id_seq" OWNER TO postgres;

--
-- TOC entry 3976 (class 0 OID 0)
-- Dependencies: 224
-- Name: Address_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Address_id_seq" OWNED BY public."Address".id;


--
-- TOC entry 231 (class 1259 OID 18003)
-- Name: Brand; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Brand" (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Brand" OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 18002)
-- Name: Brand_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Brand_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Brand_id_seq" OWNER TO postgres;

--
-- TOC entry 3977 (class 0 OID 0)
-- Dependencies: 230
-- Name: Brand_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Brand_id_seq" OWNED BY public."Brand".id;


--
-- TOC entry 233 (class 1259 OID 18014)
-- Name: ColorFilter; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ColorFilter" (
    id integer NOT NULL,
    name text NOT NULL,
    color text NOT NULL
);


ALTER TABLE public."ColorFilter" OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 18013)
-- Name: ColorFilter_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ColorFilter_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ColorFilter_id_seq" OWNER TO postgres;

--
-- TOC entry 3978 (class 0 OID 0)
-- Dependencies: 232
-- Name: ColorFilter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ColorFilter_id_seq" OWNED BY public."ColorFilter".id;


--
-- TOC entry 227 (class 1259 OID 17969)
-- Name: Destination; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Destination" (
    id integer NOT NULL,
    name text NOT NULL,
    "group" public."DestinationGroup" NOT NULL,
    actif boolean NOT NULL,
    code_iso text NOT NULL
);


ALTER TABLE public."Destination" OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 17968)
-- Name: Destination_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Destination_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Destination_id_seq" OWNER TO postgres;

--
-- TOC entry 3979 (class 0 OID 0)
-- Dependencies: 226
-- Name: Destination_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Destination_id_seq" OWNED BY public."Destination".id;


--
-- TOC entry 239 (class 1259 OID 18049)
-- Name: Order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Order" (
    id integer NOT NULL,
    "userId" text NOT NULL,
    "totalAmountCent" integer NOT NULL,
    status public."OrderStatus" DEFAULT 'PENDING'::public."OrderStatus" NOT NULL,
    "stripeSessionId" text,
    "stripePaymentId" text,
    "paymentMethod" text,
    "transactionId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Order" OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 18066)
-- Name: OrderItem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."OrderItem" (
    id integer NOT NULL,
    "productId" integer NOT NULL,
    quantity integer NOT NULL,
    "priceCent" integer NOT NULL,
    "orderId" integer NOT NULL,
    "sizeId" integer NOT NULL
);


ALTER TABLE public."OrderItem" OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 18065)
-- Name: OrderItem_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."OrderItem_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."OrderItem_id_seq" OWNER TO postgres;

--
-- TOC entry 3980 (class 0 OID 0)
-- Dependencies: 240
-- Name: OrderItem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."OrderItem_id_seq" OWNED BY public."OrderItem".id;


--
-- TOC entry 238 (class 1259 OID 18048)
-- Name: Order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Order_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Order_id_seq" OWNER TO postgres;

--
-- TOC entry 3981 (class 0 OID 0)
-- Dependencies: 238
-- Name: Order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Order_id_seq" OWNED BY public."Order".id;


--
-- TOC entry 229 (class 1259 OID 17983)
-- Name: Product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Product" (
    id integer NOT NULL,
    line text NOT NULL,
    model text NOT NULL,
    colorway text NOT NULL,
    year text NOT NULL,
    price integer NOT NULL,
    image text NOT NULL,
    visuals text[],
    edition text,
    audience public."Audience" NOT NULL,
    "colorFilterId" integer NOT NULL,
    description text NOT NULL,
    "brandId" integer NOT NULL,
    tags public."ProductTag"[]
);


ALTER TABLE public."Product" OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 18038)
-- Name: ProductSize; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProductSize" (
    id integer NOT NULL,
    "productId" integer NOT NULL,
    "sizeId" integer NOT NULL,
    stock integer NOT NULL
);


ALTER TABLE public."ProductSize" OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 18037)
-- Name: ProductSize_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ProductSize_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ProductSize_id_seq" OWNER TO postgres;

--
-- TOC entry 3982 (class 0 OID 0)
-- Dependencies: 236
-- Name: ProductSize_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ProductSize_id_seq" OWNED BY public."ProductSize".id;


--
-- TOC entry 228 (class 1259 OID 17982)
-- Name: Product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Product_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Product_id_seq" OWNER TO postgres;

--
-- TOC entry 3983 (class 0 OID 0)
-- Dependencies: 228
-- Name: Product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Product_id_seq" OWNED BY public."Product".id;


--
-- TOC entry 221 (class 1259 OID 17912)
-- Name: Session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Session" (
    id text NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    token text NOT NULL,
    "createdAt" timestamp(3) without time zone NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "ipAddress" text,
    "userAgent" text,
    "userId" text NOT NULL
);


ALTER TABLE public."Session" OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 18026)
-- Name: Size; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Size" (
    id integer NOT NULL,
    size text NOT NULL,
    category public."CategorySize" NOT NULL
);


ALTER TABLE public."Size" OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 18025)
-- Name: Size_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Size_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Size_id_seq" OWNER TO postgres;

--
-- TOC entry 3984 (class 0 OID 0)
-- Dependencies: 234
-- Name: Size_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Size_id_seq" OWNED BY public."Size".id;


--
-- TOC entry 223 (class 1259 OID 17936)
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    "emailVerified" boolean NOT NULL,
    image text,
    "createdAt" timestamp(3) without time zone NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 17925)
-- Name: Verification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Verification" (
    id text NOT NULL,
    identifier text NOT NULL,
    value text NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone,
    "updatedAt" timestamp(3) without time zone
);


ALTER TABLE public."Verification" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 17843)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- TOC entry 3747 (class 2604 OID 17953)
-- Name: Address id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Address" ALTER COLUMN id SET DEFAULT nextval('public."Address_id_seq"'::regclass);


--
-- TOC entry 3750 (class 2604 OID 18006)
-- Name: Brand id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Brand" ALTER COLUMN id SET DEFAULT nextval('public."Brand_id_seq"'::regclass);


--
-- TOC entry 3751 (class 2604 OID 18017)
-- Name: ColorFilter id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ColorFilter" ALTER COLUMN id SET DEFAULT nextval('public."ColorFilter_id_seq"'::regclass);


--
-- TOC entry 3748 (class 2604 OID 17972)
-- Name: Destination id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Destination" ALTER COLUMN id SET DEFAULT nextval('public."Destination_id_seq"'::regclass);


--
-- TOC entry 3754 (class 2604 OID 18052)
-- Name: Order id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order" ALTER COLUMN id SET DEFAULT nextval('public."Order_id_seq"'::regclass);


--
-- TOC entry 3757 (class 2604 OID 18069)
-- Name: OrderItem id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItem" ALTER COLUMN id SET DEFAULT nextval('public."OrderItem_id_seq"'::regclass);


--
-- TOC entry 3749 (class 2604 OID 17986)
-- Name: Product id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product" ALTER COLUMN id SET DEFAULT nextval('public."Product_id_seq"'::regclass);


--
-- TOC entry 3753 (class 2604 OID 18041)
-- Name: ProductSize id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductSize" ALTER COLUMN id SET DEFAULT nextval('public."ProductSize_id_seq"'::regclass);


--
-- TOC entry 3752 (class 2604 OID 18029)
-- Name: Size id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Size" ALTER COLUMN id SET DEFAULT nextval('public."Size_id_seq"'::regclass);


--
-- TOC entry 3949 (class 0 OID 17899)
-- Dependencies: 220
-- Data for Name: Account; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Account" VALUES ('2Ol0QoBr2YfxRP1yokyAEIbOKkrWMSJU', '0CC5CJLPBF8hhaNGtxxR6Kgr0XAA4V4f', 'credential', '0CC5CJLPBF8hhaNGtxxR6Kgr0XAA4V4f', NULL, NULL, NULL, NULL, NULL, NULL, '88775e7ee0de48e16b2936156dc94b60:78824208b19f99e91053ae928368131784de65a8a89560a7c95a71deadc831f211cb5536bb7564f4b2fe27399b2c5e13def4667f59af17dbadd864a5f9afa84c', '2026-05-07 10:53:19.623', '2026-05-07 10:53:19.623');


--
-- TOC entry 3954 (class 0 OID 17950)
-- Dependencies: 225
-- Data for Name: Address; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3960 (class 0 OID 18003)
-- Dependencies: 231
-- Data for Name: Brand; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Brand" VALUES (1, 'ADIDAS');
INSERT INTO public."Brand" VALUES (2, 'ASICS');
INSERT INTO public."Brand" VALUES (3, 'JORDAN');
INSERT INTO public."Brand" VALUES (4, 'NIKE');
INSERT INTO public."Brand" VALUES (5, 'NEW_BALANCE');


--
-- TOC entry 3962 (class 0 OID 18014)
-- Dependencies: 233
-- Data for Name: ColorFilter; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."ColorFilter" VALUES (3, 'blanc', 'white');
INSERT INTO public."ColorFilter" VALUES (1, 'noir', 'black');
INSERT INTO public."ColorFilter" VALUES (2, 'gris', 'gray');
INSERT INTO public."ColorFilter" VALUES (4, 'jaune', 'yellow');
INSERT INTO public."ColorFilter" VALUES (5, 'orange', 'orange');
INSERT INTO public."ColorFilter" VALUES (6, 'bleu', 'blue');
INSERT INTO public."ColorFilter" VALUES (7, 'rose', 'pink');
INSERT INTO public."ColorFilter" VALUES (8, 'vert', 'green');
INSERT INTO public."ColorFilter" VALUES (9, 'rouge', 'red');
INSERT INTO public."ColorFilter" VALUES (10, 'violet', 'purple');
INSERT INTO public."ColorFilter" VALUES (11, 'marron', '#5a3a22');
INSERT INTO public."ColorFilter" VALUES (12, 'beige', '#EDE8D0');


--
-- TOC entry 3956 (class 0 OID 17969)
-- Dependencies: 227
-- Data for Name: Destination; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Destination" VALUES (1, 'France', 'METROPOLE', true, 'FR');
INSERT INTO public."Destination" VALUES (2, 'Guadeloupe', 'DOM', true, 'GP');
INSERT INTO public."Destination" VALUES (3, 'Martinique', 'DOM', true, 'MQ');
INSERT INTO public."Destination" VALUES (4, 'La Réunion', 'DOM', true, 'RE');
INSERT INTO public."Destination" VALUES (5, 'Mayotte', 'DOM', true, 'YT');
INSERT INTO public."Destination" VALUES (6, 'Guyane', 'DOM', true, 'GF');


--
-- TOC entry 3968 (class 0 OID 18049)
-- Dependencies: 239
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3970 (class 0 OID 18066)
-- Dependencies: 241
-- Data for Name: OrderItem; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3958 (class 0 OID 17983)
-- Dependencies: 229
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Product" VALUES (78, 'air jordan', '3', 'A Ma Maniére Raised by Women', '2021', 25900, 'uCG9Pu621cBnEpykY3mR6B87.webp', '{01-uCG9Pu621cBnEpykY3mR6B87.webp,02-Hwaa52GQLqEdZMKepeeVg2ve.webp,03-Q7RigvTdE6xwh79Rd6xhjiut.webp,04-NxZRvyVcpWRv4dqwhMNQra5w.webp,05-kgPK7XTDbNK3MezdU84sjR9y.webp,06-j5tPKiiKsNmPALrbuoSPEXLU.webp,07-7bbZ9NyUB5GyC8njuGXUV6oA.webp}', 'retro sp', 'WOMEN', 3, 'La Air Jordan 3 Retro SP « A Ma Maniére Raised by Women » 2021 célèbre l''élégance féminine avec des matériaux premium luxueux. La tige en cuir violet doux et daim présente des détails raffinés et une finition soignée. Le motif éléphant repensé et le logo Jumpman discret sur la languette ajoutent du caractère. La doublure en satin avec message inspirant rend hommage aux femmes influentes. Cette collaboration exclusive marie savoir-faire artisanal et héritage Jordan pour une pièce collector exceptionnelle et significative.', 3, '{NEW_ARRIVAL,OUR_PICK}');
INSERT INTO public."Product" VALUES (83, 'v2k run', '', 'Pink Foam Arctic Pink', '2025', 15900, 'zd1p4l8fwqm62zjgii14bfnkprjb.webp', '{01-zd1p4l8fwqm62zjgii14bfnkprjb.webp,02-xstrvj8pzpi2nt8kb5uqyjwthna7.webp,03-k07z6k1bygnn4o6enqcbdjgrea42.webp,04-6vpjir0gdxoc8vetvxou7h3po0la.webp,05-nw417s7ddcwv4ox77pdedj0bp94l.webp,06-vny81y7h4os9h0f1t7okihvm1c1g.webp,07-50vzqsn3vr8q19oq2jozsbvxqes9.webp}', NULL, 'WOMEN', 7, 'La Nike V2K Run « Pink Foam Arctic Pink » 2025 apporte une touche féminine vibrante à la silhouette Y2K audacieuse. La tige en mesh technique présente des dégradés de rose du plus doux au plus intense. Les overlays synthétiques et les découpes agressives créent un design dynamique et moderne. La semelle intermédiaire volumineuse avec amorti en mousse garantit confort optimal, rehaussée par des accents roses vifs. Les détails réfléchissants et la semelle extérieure sculptée complètent cette version expressive qui marie performance et style contemporain distinctif.', 4, '{NEW_ARRIVAL}');
INSERT INTO public."Product" VALUES (4, 'air jordan', '5', 'Fire Red Black Tongue 2025', '2025', 17900, '63hzh386rui0zp4pj2pvch7zl915.webp', '{01-63hzh386rui0zp4pj2pvch7zl915.webp,02-qjfh0wytpnkszv1gb73jgey3it3y.webp,03-q5c5br7b2yxabqgwqlmdeann9gvv.webp,04-bjvu2dvshgs0bsybix843yzqe0ui.webp,05-tlz5xeyp24xayesm5a0inboux5vi.webp,06-gx0k3wokr6rm9xm9mh4f0dpgx0jl.webp,07-gklgbe77dwslsz6dlhdjrdw6l3cy.webp}', NULL, 'MEN', 9, 'La Air Jordan 5 Retro « Fire Red Black Tongue » 2025 revisite un classique emblématique avec sa tige en cuir blanc immaculé et ses accents rouge feu vibrants. Le logo Jumpman noir sur la languette et les détails en mesh translucide sur les panneaux latéraux offrent une respirabilité optimale. La semelle intermédiaire visible intègre la technologie Air pour un amorti exceptionnel, tandis que la semelle extérieure en caoutchouc translucide assure une adhérence remarquable.', 3, '{NEW_ARRIVAL,POPULAR}');
INSERT INTO public."Product" VALUES (90, 'gel 1130', '', 'White Silver Pink', '2024', 11900, '7zit324tum7xykupy1aw20jbaby3.webp', '{01-7zit324tum7xykupy1aw20jbaby3.webp,02-pq9f9aws1vskpvkaawpknylffx3y.webp,03-vvxmq5udsmr9bcbwm2zyse215x82.webp,04-x8tfq5p3slqc7b76qxszj6xmntxe.webp,05-1z4g1wu1wyiakd8j4zupezvts388.webp,06-81g3gz0wbzb04zg8wbupbn33ftx6.webp,07-m6cyk0rzhu00jtdqaz6w1fuw0myh.webp}', NULL, 'WOMEN', 7, 'La ASICS Gel 1130 « White Silver Pink » 2024 marie esthétique rétro et modernité féminine. La tige en mesh blanc respirant est rehaussée d''overlays argentés et de touches rose délicates. Les panneaux latéraux présentent des découpes techniques pour un style distinctif. La technologie GEL dans la semelle intermédiaire assure un amorti exceptionnel, tandis que la semelle extérieure en caoutchouc avec motif d''adhérence garantit stabilité. Cette silhouette polyvalente conjugue confort optimal et esthétique contemporaine pour le quotidien.', 2, '{NEW_ARRIVAL,POPULAR,OUR_PICK}');
INSERT INTO public."Product" VALUES (10, 'air jordan', '3', 'Black Cat 2025', '2025', 28900, 'zlrcmbybw7qhyor6levt2urdlilo.webp', '{01-zlrcmbybw7qhyor6levt2urdlilo.webp,02-ypy4h01hm0lahef2p7mp8y4r9fiq.webp,03-1ucmbcbmmb800bjntbhj7nppps18.webp,04-4ug9riqfktz7ay7toeo4lrld95z0.webp,05-iq6peskk6nt1x3fsqojkxqqfq4id.webp,06-qyh2z2y19apqp21kx4nd9ld7ukpz.webp,07-oeogx1orqdys4z2xm4insfvo9l2k_0cdc168d-34e3-4f18-a711-20ca142e98bb.webp}', NULL, 'MEN', 1, 'La Air Jordan 3 « Black Cat » 2025 célèbre l''élégance furtive avec une tige entièrement noire en cuir premium et daim. Le motif éléphant noir sur noir sur les overlays crée une texture subtile et sophistiquée. Le logo Jumpman discret sur la languette et les détails ton sur ton maintiennent l''esthétique monochrome. La semelle intermédiaire visible avec technologie Air assure un amorti optimal, tandis que la semelle extérieure noire complète ce design mystérieux. Cette édition all-black incarne le minimalisme élégant et l''héritage Jordan avec une approche contemporaine affirmée.', 3, '{NEW_ARRIVAL,POPULAR}');
INSERT INTO public."Product" VALUES (36, 'gel', 'nyc', 'Graphite Grey Black', '2023', 15900, '6ijg8encjwkjtmun7udlwu2bf0dy.webp', '{01-6ijg8encjwkjtmun7udlwu2bf0dy.webp,02-ej5h6jh7phk58i7m9g7w0qthnuk0.webp,03-ho1py0r8dvnj2wgul60yrs1bmnv3.webp,04-pg839ivcvz4iudpp61c3vb5osqi8.webp,05-1xiu641ft9lspdbd2udrugwbftaj.webp,06-4tandza3eckfldurvazr4oqwul21.webp,07-cytpdjlw1it2u1brrsnkkgvjnhyp.webp}', NULL, 'MEN', 1, 'La ASICS Gel-NYC « Graphite Grey Black » 2023 fusionne l''héritage du running avec un design urbain contemporain. Sa tige en mesh respirant et superpositions synthétiques gris graphite est rehaussée d''accents noirs stratégiques. La technologie GEL à l''avant-pied et au talon garantit un amorti supérieur, tandis que la semelle intermédiaire sculptée offre un confort tout au long de la journée. Les détails réfléchissants ajoutent une touche de modernité à cette silhouette polyvalente.', 2, '{NEW_ARRIVAL,POPULAR,BEST_SELLER,OUR_PICK}');
INSERT INTO public."Product" VALUES (12, 'air jordan', '12', 'Flu Game 2025', '2025', 24900, 'l7s6s2y38bjcie51animj3un38eh.webp', '{01-l7s6s2y38bjcie51animj3un38eh.webp,02-ulg7uresl2tjl401uxdfydbpj5r6.webp,03-uvwb6dqr7obxa9knsr55midpkvx1.webp,04-714de2vzqd71bkllo0ailnq0r4jm.webp,05-nki9e48d4tebgjbw0h5nz9ta82i2.webp,06-b87nn04h4b5g0y4kazejrb62lgfk.webp,07-2fke1059aqr68ondaw9sbft9olvu.webp}', NULL, 'MEN', 1, 'La Air Jordan 12 « Flu Game » 2025 commémore le match légendaire de Michael Jordan de 1997. Cette édition rétro présente une tige en cuir noir premium avec des détails rouge vif évoquant le drapeau japonais. Les surpiqûres ondulées caractéristiques et le Jumpman métallique sur la languette créent un look distinctif. La semelle intermédiaire en Phylon avec capsules Zoom Air offre un amorti réactif, tandis que la semelle extérieure en caoutchouc assure une traction maximale.', 3, '{NEW_ARRIVAL,POPULAR,BEST_SELLER,OUR_PICK}');
INSERT INTO public."Product" VALUES (15, 'air jordan', '9', 'Cool Grey 2025', '2025', 25900, '0ewc2ctxlmze9r4p5au1i9ca8j1q.webp', '{01-0ewc2ctxlmze9r4p5au1i9ca8j1q.webp,02-swussgu3m62q7scazfgys3ejss9f.webp,03-u72he4lhx2deaoi3rwd1qfyy6osa.webp,04-f7y7ju1w12ed8v5wa28nq3welqkb.webp,05-qzb6hvltqkoge6nv1smf9v0h00ys.webp,06-h0rjh4c38y8gs5qv047vxszyij1p.webp,07-ah2opakwq9au92ocjiz3fzwzwis8.webp}', NULL, 'MEN', 2, 'La Air Jordan 9 « Cool Grey » 2025 incarne l''élégance sobre avec sa palette de gris raffinés. La tige en cuir premium et nubuck présente des nuances de gris cool sur toute la chaussure. Les détails texturés sur les panneaux latéraux et le logo Jumpman discret sur la languette ajoutent du caractère. La semelle intermédiaire visible intègre la technologie Air pour un amorti optimal, tandis que la semelle extérieure en caoutchouc translucide offre adhérence et style urbain contemporain.', 3, '{}');
INSERT INTO public."Product" VALUES (59, 'samba', 'og', 'Leopard Cream Orange', '2025', 9900, 'dmk5atd5p64zhfgiltvmbxb3pzj7.webp', '{01-dmk5atd5p64zhfgiltvmbxb3pzj7.webp,02-hzzjpgfywbx772jbiryp347sllzp.webp,03-io4m7qxgclj05kitnnw9juh420cv.webp,04-z5q6yjxcsjev6hcfjwh5yvw1fsca.webp,05-sw2wjfg5cqqu2fcts9ov3a96b04s.webp,06-hmr77ul9809hxmtj94b8pz9bzzn3.webp,07-w3h49e65nt1a1i1b3nbl2ber8rt7.webp}', NULL, 'WOMEN', 5, 'La Adidas Samba Og « Leopard Cream Orange » 2025 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Disponible pour un public féminin. Un design soigné, un confort maîtrisé et une finition pensée pour durer.', 1, '{NEW_ARRIVAL}');
INSERT INTO public."Product" VALUES (82, 'v2k run', '', 'Black Anthracite', '2023', 7900, 'ynnbv626whal6t99xu546zejy4xm.webp', '{01-ynnbv626whal6t99xu546zejy4xm.webp,02-llhtw7x3d4b0vs12ogabpmossh41.webp,03-vbouddekbwpjrakveucqmn5432hq.webp,04-ul670onkabk6hx8gawrxb2qmzacs.webp,05-i5m7e5usqq2cmq8r504b9zofvkv6.webp,06-o1aj8gb1ctvph1mv3b4sy7irpi7f.webp,07-mxeblip4hjii448bi3kyqwat4ksg.webp}', NULL, 'WOMEN', 1, 'La Nike V2K Run « Black Anthracite » 2023 incarne l''esthétique Y2K avec une silhouette audacieuse entièrement noire. La tige en mesh technique et overlays synthétiques présente des lignes agressives et des découpes prononcées. Les détails texturés et le logo Swoosh ton sur ton créent un look monochrome sophistiqué. La semelle intermédiaire imposante avec amorti en mousse offre confort exceptionnel, tandis que la semelle extérieure en caoutchouc assure adhérence optimale. Cette version sombre transforme l''héritage running en statement sneaker pour un style urbain affirmé.', 4, '{POPULAR}');
INSERT INTO public."Product" VALUES (18, 'air jordan', '3', 'Pure Money', '2025', 15900, 'wssgw8hehki6oqfaww7aqim718fy.webp', '{01-wssgw8hehki6oqfaww7aqim718fy.webp,02-av8h26uwubmj9vhbvsgor5i1krgu.webp,03-fbryqcku56jge3hxtsw2rrr30j0w.webp,04-jbddhhzy75pisxjazstspchyxgxw.webp,05-v48s9tnrfqop7idb1k30we4xmay3.webp,06-tqswindniz2kndvr9qvccf9q0mha.webp,07-kvkyrr3yj7wevna3kgvy4vmul8ev.webp}', NULL, 'MEN', 3, 'La Air Jordan 3 « Pure Money » 2025 célèbre le minimalisme avec sa tige entièrement blanche en cuir premium. Les détails emblématiques incluent le logo éléphant gris sur les overlays et le Jumpman argenté sur la languette. La semelle intermédiaire visible intègre la technologie Air pour un confort optimal, tandis que les perforations sur les panneaux latéraux assurent respirabilité. Cette édition épurée incarne l''élégance intemporelle avec sa palette monochrome et ses finitions soignées pour un style polyvalent.', 3, '{POPULAR}');
INSERT INTO public."Product" VALUES (32, 'gel', '1130', 'Black Pure Silver', '2023', 11900, 'tugrhotr1k7c7em9s2sqeyk0gghe.webp', '{01-tugrhotr1k7c7em9s2sqeyk0gghe.webp,02-aql50b61pyfvjpyacw35kgnczx5p.webp,03-2t5mnh3s06ryuw6ac8md42a0410s.webp,04-tvajne205c4nvjgn26fvicyllexz.webp,05-kv20bxz71kw5g02je5kdf37vwsa6.webp,06-719jwemn49jze8m4zl9znf4efjok.webp,07-fv0v2bx72n73kgshqgu4m22p8gd6.webp}', NULL, 'MEN', 1, 'La Asics Gel 1130 « Black Pure Silver » 2023 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Disponible pour un public masculin. Un design soigné, un confort maîtrisé et une finition pensée pour durer.', 2, '{NEW_ARRIVAL,POPULAR,BEST_SELLER}');
INSERT INTO public."Product" VALUES (3, 'air jordan', '5', 'tokyo 2025', '2025', 44900, '80e2w4wbm5wq93l3xelai8u9mk7h.webp', '{01-80e2w4wbm5wq93l3xelai8u9mk7h.webp}', NULL, 'MEN', 4, 'La Air Jordan 5 « Tokyo » 2025 est une édition limitée qui rend hommage à la culture streetwear japonaise. Cette paire exclusive arbore des détails premium et une palette de couleurs inspirée de Tokyo. La tige en cuir et nubuck présente des finitions soignées, tandis que la languette matelassée et le logo Jumpman iconique complètent le design. La semelle intermédiaire visible avec technologie Air offre un confort et un style inégalés pour cette version collector recherchée.', 3, '{OUR_PICK}');
INSERT INTO public."Product" VALUES (69, 'samba', 'og', 'Cracked Metallic Pack Gold', '2025', 8900, '9qlaac8qp0zhgmk5e9b3b7o8pynf.webp', '{01-9qlaac8qp0zhgmk5e9b3b7o8pynf.webp,02-gb4vkp9p0y4w848ijpq23nfuyfdo.webp,03-aaif2eqknw38bgp9uvwnh2je294y.webp,04-s9mwyfzc6lmpbmc3dlugcw6mb2zt.webp,05-0cmuvttgpqzflab892235vqfkqr5.webp,06xzr8ogtw5utbiddwfe2cha8nb5i4.webp,07-24mgbny9cnsy6449xz9gyjl9xxrq.webp}', NULL, 'WOMEN', 4, 'La Adidas Samba OG « Cracked Metallic Pack Gold » 2025 apporte une finition luxueuse au modèle iconique. La tige présente un effet cuir craquelé doré métallique qui capte la lumière de façon spectaculaire. Les trois bandes noires emblématiques créent un contraste saisissant sur les côtés. L''empiècement en daim sur l''avant-pied et la semelle en gomme naturelle conservent l''ADN authentique. Cette édition limitée transforme le classique football en pièce statement pour un style urbain audacieux et sophistiqué au quotidien.', 1, '{NEW_ARRIVAL,POPULAR,BEST_SELLER,OUR_PICK}');
INSERT INTO public."Product" VALUES (28, 'samba', 'og', 'Brown', '2024', 14900, 'i4omt0iaj1aqs2mvk43818t3mhbx.webp', '{01-i4omt0iaj1aqs2mvk43818t3mhbx.webp,02-ppcg5p0kpf4yj3yii59ebw79gfpa.webp,03-7ikn5gmjpus91kukgv0qi4jbjc4a.webp,04-sl968qujc5z9026tni4bzy1v8u6o.webp,05-03akfk1q1m486uiyk521uy3yg2sp.webp,06-x8nsnhhljzech1wu8f8nujyp6qy8.webp,07-x9rrfxyibws44j662bf9zvhascf4.webp}', NULL, 'MEN', 9, 'La Adidas Samba Og « Brown » 2024 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Disponible pour un public masculin. Un design soigné, un confort maîtrisé et une finition pensée pour durer.', 1, '{POPULAR}');
INSERT INTO public."Product" VALUES (33, 'gel kayano', '14', 'Black Pure Silver', '2024', 13900, 'whs3b373si4ce74uk1toyyjdd10v.webp', '{01-whs3b373si4ce74uk1toyyjdd10v.webp,02-kreg5wgawsbgasko0ssx9exlsn8x.webp,03-o5knt1darfcakmje6zsacdl0ibus.webp,04-qeerfwnld4qi5gq0ii0j8wsm3wyu.webp,05-tywgkqnxsiid0h0tou2dq5d5q18b.webp,06-3dyr9in2ywfmjgi87wcefpalmus5.webp,07-v30ovy4qndhkh8uu15wwk1v5ya4f.webp}', NULL, 'MEN', 1, 'La Asics Gel Kayano 14 « Black Pure Silver » 2024 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Disponible pour un public masculin. Un design soigné, un confort maîtrisé et une finition pensée pour durer.', 2, '{POPULAR,BEST_SELLER}');
INSERT INTO public."Product" VALUES (79, 'air max', '95', 'Pink Foam', '2025', 22900, '6y1jwwokwannvzadw4gdwuxbzhc7.webp', '{01-6y1jwwokwannvzadw4gdwuxbzhc7.webp,02-sv64wfbzzf5cv2125sus1ub3malh.webp,03-880pspm3ga5pm7tntw5zx5cfbgod.webp,04-7ddr2cv5vdi5a16kmv9jf4noe7h9.webp,05-6ecwuztd0krc5f3itey3jqxmbzhy.webp,06-jvtz69fya9r6ifk7vm6mhhukxnhs.webp,07-0rhgwmzfatds4z25h76jmd9e4dxx.webp}', NULL, 'WOMEN', 7, 'La Nike Air Max 95 « Pink Foam » 2025 revisite l''icône des années 90 avec une palette rose mousse féminine et moderne. Les lignes ondulées caractéristiques présentent des gradients de rose du plus clair au plus foncé. La tige combine mesh respirant et overlays synthétiques pour un confort optimal. L''unité Air Max visible dans la semelle assure un amorti exceptionnel, tandis que les détails réfléchissants ajoutent une touche contemporaine. Cette version audacieuse transforme un classique running en statement sneaker pour un style urbain distinctif.', 4, '{POPULAR,OUR_PICK}');
INSERT INTO public."Product" VALUES (13, 'air jordan', '3', 'Black Cement', '2024', 21900, '80selv0vzzmqcslui88ea1xgc710.webp', '{01-80selv0vzzmqcslui88ea1xgc710.webp,02-58i2tm0q9xmppf9h953to6jhjrpb.webp,03-l0s6n8zwf1fwq96med50idf8g5mc.webp,04-eqo0k3ds3vfjz63ot0q30uosyy5e.webp,05-k5ddagmvaimci67u1opfi0ga643b.webp,06-p61favy8v530wzuw72xnu2p9ptlw.webp,07-81mu447jzinfn9z7xz2qjq1oeins.webp}', NULL, 'MEN', 1, 'La Air Jordan 3 « Black Cement » 2024 revisite un des coloris les plus emblématiques de l''histoire Jordan. La tige combine cuir noir premium et gris ciment avec le motif éléphant iconique sur les overlays. Le logo Jumpman rouge vif sur la languette crée un contraste saisissant. Les détails ciment splatter sur la semelle intermédiaire ajoutent authenticité et caractère. La semelle intermédiaire visible avec technologie Air garantit un amorti exceptionnel. Cette édition intemporelle marie héritage basketball et style urbain pour une pièce essentielle de toute collection sneaker.', 3, '{POPULAR,BEST_SELLER,OUR_PICK}');
INSERT INTO public."Product" VALUES (17, 'air jordan', '4', 'Undefeated 2025', '2025', 33900, '0hm91gqeeu0bb9fofw4xbmfe8f27.webp', '{01-0hm91gqeeu0bb9fofw4xbmfe8f27.webp}', 'og sp', 'MEN', 8, 'La Air Jordan 4 OG SP « Undefeated » 2025 incarne l''exclusivité avec cette collaboration emblématique limitée. La tige présente des matériaux premium et une palette de couleurs inspirée du branding militaire d''Undefeated. Les détails spéciaux incluent un co-branding distinctif et des finitions soignées. Les supports de laçage et le logo Jumpman sur la languette maintiennent l''ADN authentique. La semelle intermédiaire visible avec technologie Air assure un amorti exceptionnel. Cette édition collector ultra-recherchée marie l''héritage Jordan et l''esthétique streetwear d''Undefeated pour une pièce exceptionnelle.', 3, '{NEW_ARRIVAL,OUR_PICK}');
INSERT INTO public."Product" VALUES (91, 'gel 1130', '', 'Pink Glo Black', '2025', 11900, '5481m622tszjfg7yk5c7jf773xmc.webp', '{01-5481m622tszjfg7yk5c7jf773xmc.webp}', NULL, 'WOMEN', 7, 'La ASICS Gel 1130 « Pink Glo Black » 2025 apporte une énergie vibrante avec son rose fluo éclatant. La tige combine mesh technique et overlays synthétiques dans un contraste saisissant rose lumineux et noir profond. Les découpes latérales et détails réfléchissants créent une signature dynamique moderne. La technologie GEL dans la semelle assure un amorti exceptionnel pour un confort optimal. Cette édition audacieuse transforme la silhouette rétro en statement sneaker contemporaine qui capte l''attention avec son esthétique néon affirmée et énergique pour le quotidien urbain.', 2, '{NEW_ARRIVAL}');
INSERT INTO public."Product" VALUES (92, 'gel 1130', '', 'Neon Pack Green', '2025', 9900, 'rjv6xp8s49jz0cvmkbg1oz5jwl90.webp', '{01-rjv6xp8s49jz0cvmkbg1oz5jwl90.webp,02-tflbw6gs8v6ud36484nwc95asw2z.webp,03-chk999ytyf5ruxj2ii9qw6fv6duo.webp,04-nrvwbl1656kggk6gbjxmq1r9fs9h.webp,05-33e3vlb8poqsnchldrq0htjchx4p.webp,06-oq0uyrbobdehl9ovts5h05ek41ih.webp,07-o5tovpt8rdabh7j5w3exwiuz4xmd.webp}', NULL, 'WOMEN', 8, 'La ASICS Gel 1130 « Neon Pack Green » 2025 incarne l''énergie urbaine avec sa palette vert fluo électrique. La tige en mesh technique présente des overlays synthétiques dans des tons verts néon éclatants contrastés par des détails noirs. Les découpes latérales caractéristiques et les accents réfléchissants ajoutent une dimension futuriste. La technologie GEL stratégiquement placée garantit un amorti supérieur et confort exceptionnel. Cette version vibrante du Neon Pack transforme le classique running en pièce statement audacieuse pour un style urbain contemporain qui ne passe pas inaperçu.', 2, '{NEW_ARRIVAL}');
INSERT INTO public."Product" VALUES (2, 'air jordan', '4', 'fear', '2024', 18900, '7f1c2879-8ce6-432c-871f-a0fc821ae402.webp', '{01-38941b1c-2dd5-401b-b4b1-c232a58b655b.webp,02-efcd2031-9ee0-4d28-b362-e34e3053632a.webp,03-fa78129b-187b-4e35-af1f-fd58e5da3149.webp,04-e9c71448-484b-46a4-9aa8-80f4274a9021.webp,05-ac2aca51-ae0e-41a0-91bb-d0f707177738.webp,06-2ffa2f73-d907-4305-8f61-a86886b2ff44.webp,07-62ad4e05-baea-448f-82b8-4c6014699eae.webp}', NULL, 'MEN', 1, 'La Air Jordan 4 « Fear » 2024 incarne l''audace avec sa tige en cuir premium noir et gris anthracite. Les panneaux latéraux en mesh noir et les supports de laçage caractéristiques créent une signature distinctive. Le logo Jumpman sur la languette et les détails réfléchissants ajoutent du caractère à cette édition sombre. La semelle intermédiaire visible avec technologie Air assure un amorti optimal, tandis que la semelle extérieure translucide fumée complète ce design mystérieux. Cette version monochrome sophistiquée marie héritage basketball et esthétique urbaine contemporaine affirmée.', 3, '{POPULAR,BEST_SELLER}');
INSERT INTO public."Product" VALUES (27, 'gazelle', 'indoor', 'Earth Strata White Gold Metallic', '2024', 9900, 'g3zkn78nn2484jg0pjwtsulbqs84.webp', '{01-g3zkn78nn2484jg0pjwtsulbqs84.webp,02-e6byzscuujlxvjs6xp7e59h36pn9.webp,03-lnr97utyji2tm45z09upwa8jcqoa.webp,04-59fciz5cqvsersyhp3gwi55vx670.webp,05-zku8edk243cf5l4zyfusunowozic.webp,06-bfgx69e1q86amgksg1falbjgvifi.webp,07-ybdo0ot4rluyqj4zhcm7c0850pxt.webp}', NULL, 'MEN', 3, 'La Adidas Gazelle Indoor « Earth Strata White Gold Metallic » 2024 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Disponible pour un public masculin. Un design soigné, un confort maîtrisé et une finition pensée pour durer.', 1, '{BEST_SELLER}');
INSERT INTO public."Product" VALUES (47, '9060', '', 'Phantom Rich Oak', '2024', 17900, 'r33k6r1o141dxonm6xcdq7fnh2ti.webp', '{01-r33k6r1o141dxonm6xcdq7fnh2ti.webp,02-rcqh3537v0t8eydmb3785wzaxwfw.webp,03-diolymj26d2zwn731yioqk2d4f4p.webp,04-l8i1q333l8dlfhosiuqwkuyrevij.webp,05-r31d09f6l7ct6czzjeitvryy2qip.webp,06-6ngxcl8105yhj6id111ejd3uwas8.webp,07-dfn3i6pl4ip6dga4k3wmnrx8k2wy.webp}', NULL, 'MEN', 2, 'La New_Balance 9060  « Phantom Rich Oak » 2024 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Disponible pour un public masculin. Un design soigné, un confort maîtrisé et une finition pensée pour durer.', 5, '{BEST_SELLER}');
INSERT INTO public."Product" VALUES (16, 'air jordan', '5', 'Medium Soft Pink', '2025', 22900, '221ls7uxoeyqamg8eecv21eb8qkw.webp', '{01-221ls7uxoeyqamg8eecv21eb8qkw.webp,02-gmqalqhozz1dd4iwwnegb17ll996.webp,03-ys7bhqhyblb8bf8210imjvydb4vv.webp,04-p5vjkg5zoubrjrmk2z34eo4a2s8o.webp,05-two5pl5owcsop2jxeixw64r3mvmw.webp,06-tbgt7wfm4qgpxbxqhi5ibpcd06lp.webp,07-wc7t2vkc7ttndzzzx6je0pl7cmk5.webp}', 'og', 'MEN', 7, 'La Air Jordan 5 OG « Medium Soft Pink » 2025 apporte une touche féminine et audacieuse à la silhouette classique. La tige en cuir premium rose doux est rehaussée de détails en nubuck et mesh translucide. Le logo Jumpman sur la languette et les accents métalliques créent un contraste élégant. La semelle intermédiaire visible avec technologie Air assure un amorti exceptionnel, complétée par une semelle extérieure en caoutchouc translucide pour une adhérence optimale et un look distinctif.', 3, '{}');
INSERT INTO public."Product" VALUES (38, 'gel kayano', '14', 'Metallic Plum', '2023', 23900, '6b2xq20i4hd6okz4ybadlezhjasf.webp', '{01-6b2xq20i4hd6okz4ybadlezhjasf.webp,02-ic4pxnyvfkai94fdsi25dg50h9ss.webp,03-bkict24kyn9im2998ieujmwt0lmn.webp,04-er7tiecdfrkozmrry2qhbosi69n8.webp,05-il8526vupaoibuctb2o8hi1o090s.webp,06-ohiqfponst2xtvv34dhi24m78y4j.webp,07-9tbkzx644decfklr4efju3wracoh.webp}', NULL, 'MEN', 2, 'La ASICS Gel Kayano 14 « Metallic Plum » 2023 revisite l''esthétique Y2K avec une palette de prune métallique sophistiquée. La tige combine mesh technique et superpositions synthétiques dans des tons violets iridescents. Le système de lacets asymétrique et les détails réfléchissants créent un look futuriste. La technologie GEL répartie stratégiquement offre un amorti supérieur, complétée par une semelle intermédiaire sculptée. Cette version audacieuse allie performance technique et style avant-gardiste pour un look urbain distinctif.', 2, '{BEST_SELLER,OUR_PICK}');
INSERT INTO public."Product" VALUES (71, 'air jordan', '4', 'Denim Worn Blue', '2025', 17900, 'mftn5t9xr6me13uctnmxgdh8ko7a.webp', '{01-mftn5t9xr6me13uctnmxgdh8ko7a.webp}', NULL, 'WOMEN', 6, 'La Air Jordan 4 « Denim Worn Blue » 2025 réinvente le classique avec une tige en denim délavé pour un look streetwear authentique. Le tissu jean usé apporte texture et caractère unique à chaque paire. Les détails en cuir et les supports de laçage maintiennent la structure emblématique. Le logo Jumpman sur la languette et les ailettes latérales complètent le design. La semelle intermédiaire visible avec technologie Air assure confort et amorti, tandis que cette édition féminine exclusive marie héritage basketball et esthétique contemporaine.', 3, '{}');
INSERT INTO public."Product" VALUES (22, 'kobe', '6', 'total orange', '2025', 23900, 'jwtxr0grtulp8km2s66eu1qu4zp4.webp', '{01-jwtxr0grtulp8km2s66eu1qu4zp4.webp,02-d157t5sy4rle9dwtcy6gbtasy2e9.webp,03-d73zpd77lfrf7tyheq8sak4itg7b.webp,04-5kudoc8xkwnrmmarm3hetpk0f7w0.webp,05-n7h6i8th3zvuaoksx9j11ppfy7tg.webp,06-mp8aiy5x3j8rj0lwjbnz0rwsql9y.webp,07-w5obcylmr4e8wi2h14krgvqhzfyj.webp}', NULL, 'MEN', 5, 'La Nike Kobe 6 « Total Orange » 2025 rend hommage au Black Mamba avec une palette vibrante énergique. La tige basse en mesh technique est dominée par un orange total électrique qui capte l''attention. Les overlays en TPU et le swoosh contrasté créent une signature dynamique distinctive. La technologie Zoom Air dans la semelle offre un amorti réactif optimal pour la performance basketball. Les détails texturés et la semelle extérieure en caoutchouc avec motif d''adhérence complètent ce design audacieux. Cette édition expressive marie héritage Kobe et énergie urbaine contemporaine affirmée.', 4, '{NEW_ARRIVAL}');
INSERT INTO public."Product" VALUES (14, 'air jordan', '11', 'legend blue', '2024', 21900, '2yb4xfe1relg0gbx6w9lc3r3uhge.webp', '{01-2yb4xfe1relg0gbx6w9lc3r3uhge.webp,02-paf2fccyq7nopnjwqobbzfgmfjyc.webp,03-o2ifobrtr3id4br7tt2a1adgiun9.webp,04-y5q33kcod8ixfcsu8xd48ayi1lqq.webp,05-k478o7xy3kz4kq8be5ionfe0xyiu.webp,06-46awuub4d6cslwkaf5ggsdk2kslu.webp,07-a22p4dnop0d50jkiubbe3sc4gww6.webp}', 'Retro', 'MEN', 6, 'La Air Jordan 11 Retro « Legend Blue » 2024 capture l''essence du modèle iconique avec sa tige en cuir blanc immaculé et mesh respirant. L''empiècement en cuir verni bleu légendaire crée un contraste saisissant, tandis que la semelle translucide bleue rappelle le design original de 1995. Le système de lacets intégré et le col rembourré assurent un maintien optimal. La semelle intermédiaire pleine longueur avec Air garantit un confort exceptionnel pour cette silhouette intemporelle.', 3, '{POPULAR,BEST_SELLER}');
INSERT INTO public."Product" VALUES (97, 'gel nimbus', '9', 'Pale Oak Cream', '2024', 28900, 'cgj2rxvw0fcmm9pup2vwirgfe4ao.webp', '{01-cgj2rxvw0fcmm9pup2vwirgfe4ao.webp,02-aayk18chfp0pj5hl51tgg5z784yv.webp,03-3yzqiolwmnwzi8d11ddhbn5kkwzb.webp,04-fo3eo01ctriyo5cndr7ije67jbbx.webp,05-tmhaqvycncc280ygmxn9aanta9w6.webp,06-fp6btlmssswo1sea8y6asowzdfhd.webp,07-8okhl2iwcszl43qlpnos0n2bnr2a.webp}', NULL, 'WOMEN', 12, 'La ASICS Gel Nimbus 9 « Pale Oak Cream » 2024 célèbre les tons naturels avec une palette beige crème apaisante. La tige combine mesh respirant et overlays en cuir synthétique dans des nuances chêne pâle et crème. Les découpes techniques et détails texturés créent un look sophistiqué et organique. La technologie GEL répartie généreusement offre un amorti premium pour un confort maximal. La semelle intermédiaire sculptée et la semelle extérieure AHAR+ assurent durabilité exceptionnelle. Cette version épurée marie performance technique et esthétique minimaliste contemporaine.', 2, '{}');
INSERT INTO public."Product" VALUES (7, 'air jordan', '8', 'aqua 2025', '2025', 21900, '9a993gcvfiru5mqijltoydkx73or.webp', '{01-9a993gcvfiru5mqijltoydkx73or.webp,02-suhero3y4zqk0vtod4racd3rg396.webp,03-5cb832qp15qzr4crtgiws5a05i7j.webp,04-zqxwv5fzhry2h01fj4dttne4gvjn.webp,05-aikxi4aibxkpotqob2rcipw4ml9j.webp,06-00wod7rd0haf0uqczo09tn7xwkkm.webp,07-9b3a6ggr5fspcdjlbix38dcw0pwy.webp}', 'retro', 'MEN', 6, 'La Air Jordan 8 Retro « Aqua » 2025 utilise des teintes bleu sarcelle et violet sur la semelle intermédiaire en mousse, qui intègre la technologie Nike Air à l''avant-pied et au talon. Fidèles au design original de 1993, ces baskets ont une tige en nubuck noir et gris maintenue par un système unique de sangles croisées. L''étiquette multicolore en chenille sur la languette est estampillée du logo Jumpman rouge, et un empiècement bleu sarcelle arbore des touches de violet.', 3, '{POPULAR,BEST_SELLER}');
INSERT INTO public."Product" VALUES (39, 'gel kayano', '14', 'Birch Pure Silver', '2024', 12900, '6b2xq20i4hd6okz4ybadlezhjasf (1).webp', '{01-g9l7u1l9m4pop2vryywvqnqnuunn.webp,02-1i3tpgazd3tnaru2jpk8edhx9tf2.webp,03-rtsua7xo4evp3mjjjvfwafb365sh.webp,04-wl0sdvqzounuqfa51tuujr1ivvjo.webp,05-oog82vv370ppzgj5cklidzakiq2r.webp,06-z7rs112heqi71u5rdns8xh36e9fb.webp,07-b2o1kej9amoiin0ufdmk4z22wwag.png}', NULL, 'MEN', 2, 'La ASICS Gel Kayano 14 « Birch Pure Silver » 2024 célèbre l''esthétique Y2K avec sa palette de couleurs raffinée. La tige combine mesh technique et superpositions en cuir synthétique dans des tons birch et argent pur. Le système de lacets asymétrique et les empiècements réfléchissants créent un look distinctif. La technologie GEL répartie sur toute la semelle intermédiaire assure un amorti exceptionnel, complété par une semelle extérieure AHAR+ pour une durabilité accrue.', 2, '{POPULAR,OUR_PICK}');
INSERT INTO public."Product" VALUES (9, 'air jordan', '5', 'Black Metallic Reimagined', '2025', 31900, '8opri60ly8pp19vsfp3fkahi17mv.webp', '{01-8opri60ly8pp19vsfp3fkahi17mv.webp,02-fz4ubiwonel3lu8qtx92hg5jcek3.webp,03-wxhz8scxda6l5jpg6xz7p8itdn3l.webp,04-7i6asect2i24cvoyuk5uu1q96o98.webp,05-4p2sfus7qgf3bwyxaarlvzi5on9d.webp,06-cppgihq83080f6p99rdzw1m95i0l.webp,07-jk2i0swsh2icg56gozc81ynnhjsj.webp}', 'Retro OG', 'MEN', 1, 'La Air Jordan 5 Retro OG « Black Metallic Reimagined » 2025 réinvente un classique intemporel avec une approche moderne. La tige en cuir premium noir est sublimée par des détails métalliques argentés sur les panneaux latéraux et la languette. Le logo Jumpman emblématique orne la languette tandis que les mesh translucides assurent respirabilité et style. La semelle intermédiaire visible avec unité Air garantit un amorti optimal pour un confort exceptionnel au quotidien.', 3, '{}');
INSERT INTO public."Product" VALUES (19, 'air jordan', '12', 'French Blue', '2025', 15900, 'sm2xivsg8k4mk2t0hr7mbthtqe4f.webp', '{01-sm2xivsg8k4mk2t0hr7mbthtqe4f.webp,02-fh4h1711y0e10raxceac0f14on57.webp,03-v6lex43620o50ccxd97a2f4289is.webp,04-xx2qod2fjtddalm1ipn6mvepih36.webp,05-bpbud6nqxrutac5k3i6c3d6xbdga.webp,06-y20fvr2088e23winxxp3t8lwhggz.webp,07-ebbfqfllwzfs1ipu8c7k42fuha6g.webp}', NULL, 'MEN', 6, 'La Air Jordan 12 « French Blue » 2025 arbore une tige en cuir blanc premium avec des accents bleu français vibrants. Les surpiqûres ondulées caractéristiques et le logo Jumpman métallique sur la languette créent une signature distinctive. La semelle intermédiaire en Phylon avec capsules Zoom Air offre un amorti réactif et confortable. Les détails en cuir texturé et la semelle extérieure en caoutchouc avec motif d''inspiration japonaise complètent ce design élégant et performant pour un style urbain raffiné.', 3, '{}');
INSERT INTO public."Product" VALUES (41, '9060', '', 'Triple Black', '2025', 13900, '2xu1nfkalh1x0alysjm0nkamiwm0.webp', '{01-2xu1nfkalh1x0alysjm0nkamiwm0.webp,02-sgdk1bgtqadhkl54v5i8z2f4p7jk.webp,03-h884cvra03oslv6v7wcd6qxxdlsn.webp,04-tpe1b8g3mua55bgehg62zsp57glw.webp,05-za0oshng19aof15q3yy0t44jy5dq.webp,06-zjqt6e9ezsefi8idxxe1bci664o2.webp,07-nww3lx37uuvoxsyf4jswcxlyf0ak.webp}', NULL, 'MEN', 1, 'La New_Balance 9060  « Triple Black » 2025 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Disponible pour un public masculin. Un design soigné, un confort maîtrisé et une finition pensée pour durer.', 5, '{POPULAR,BEST_SELLER,OUR_PICK}');
INSERT INTO public."Product" VALUES (80, 'zoom vomero', '5', 'Metallic Gold', '2024', 13900, 'a2xg6bk7o5v3z7v2wjowq6ec8lz0.webp', '{01-a2xg6bk7o5v3z7v2wjowq6ec8lz0.webp,02-hvzdxned80umq5p2wcgrsp2jl518.webp,03-z9xw9ugd95gimbj8gbfehljatypr.webp,04-o1hv9rz0bcd6ytzqydsbys6ftvx1.webp,05-sf58e3d3gul1oxx3nekvm7zf5e51.webp,06-u7a6jlpcs1itvk44d7lccjzgzjpr.webp,07-8snazgte4qa18gf9ud79nzty966i.webp}', NULL, 'WOMEN', 4, 'La Nike Zoom Vomero 5 « Metallic Gold » 2024 fusionne performance running et esthétique luxueuse. La tige en mesh technique est rehaussée d''overlays synthétiques dorés métalliques qui créent un effet visuel captivant. Les découpes aérodynamiques et les câbles de maintien assurent un ajustement optimal. La technologie Zoom Air dans la semelle offre un amorti réactif et confortable. Les détails réfléchissants et la semelle extérieure en caoutchouc avec motif d''adhérence complètent cette silhouette polyvalente qui marie technicité et style contemporain audacieux.', 4, '{}');
INSERT INTO public."Product" VALUES (81, 'vomero', '5', 'Photon Dust', '2023', 14900, '7os7agjlm67f8roma7fa5a3t5kl7.webp', '{01-7os7agjlm67f8roma7fa5a3t5kl7.webp,02-yzbe02gw0d8wx4r9gf3zhpnucfy2.webp,03-uecwkn41fze743fynu17ct7gpff1.webp,04-05ge0jpgbrb3asgdxvw1z3y3t4f2.webp,05-ejg87uyf9g01cvzmygw7i00dv1l7.webp,06-b0i2vxjbtdyzr1akgbsn475ujwfw.webp,07-k8m0fp7de4haicjxw3082hhlkkuw.webp}', NULL, 'WOMEN', 2, 'La Nike Vomero 5 « Photon Dust » 2023 célèbre l''esthétique rétro-futuriste avec sa palette de tons neutres poudrés. La tige combine mesh respirant et overlays en cuir synthétique dans des nuances de gris et beige. Les câbles de maintien asymétriques et les découpes techniques créent une signature distinctive. La technologie Zoom Air dans la semelle intermédiaire garantit un amorti réactif, complété par une semelle extérieure en caoutchouc. Cette version épurée marie héritage running et style urbain contemporain pour un look polyvalent au quotidien.', 4, '{}');
INSERT INTO public."Product" VALUES (85, 'v2k', '', 'summit white', '2023', 9900, 'mzraywlyg9k54c08ylgrhw7wv54h.webp', '{01-mzraywlyg9k54c08ylgrhw7wv54h.webp,02-ct48qnc4xbv0uz93213pozjfl1m4.webp,03-r34moqqhca497jrfsthnhvcnh64m.webp,04-p8pcbqposn4t2nxcwywiuynehuxe.webp,05-ko160qufva18u23xmsfw6r04mfko.webp,06-gthae4n86l3bzn4t3hvhrrgl1tiv.webp,07-r7tdhgjufpsd9j81d3b3vk7o1cui.webp}', NULL, 'WOMEN', 3, 'La Nike V2K « Summit White » 2023 célèbre le minimalisme avec une approche entièrement blanche épurée. La tige en mesh technique et overlays synthétiques présente des lignes Y2K caractéristiques dans une palette monochrome. Les découpes aérodynamiques et le logo Swoosh discret créent un look sophistiqué et moderne. La semelle intermédiaire volumineuse en mousse blanche offre un amorti exceptionnel, complétée par une semelle extérieure translucide. Cette version immaculée transforme l''héritage performance en pièce lifestyle polyvalente pour un style urbain contemporain minimaliste.', 4, '{}');
INSERT INTO public."Product" VALUES (86, 'air max', '90', 'tan', '2022', 9900, 'vhap68nzivdkr3kf89rtyarmpqdw.webp', '{01-vhap68nzivdkr3kf89rtyarmpqdw.webp,02-8yvgov1zc2mzn9a2h7osua0a2q8s.webp,03-tzu30x2hlbk7qezm7s6otvl6oaqi.webp,04-cdw82yrltjwpeh3vqz92it4q77gs.webp,05-6ysbg8ukb4ruhiku9tyhf7g54nln.webp,06-itpir1l47m6pq4cta0r867oj24rd.webp,07-4a7iusetp80sq43w9mnvqahs2qpa.webp}', 'futura', 'WOMEN', 12, 'La Nike Air Max 90 « Tan » Futura 2022 réinterprète le classique avec une palette terreuse sophistiquée. La tige en cuir premium et mesh présente des tons tan et marron chaleureux. L''unité Air Max visible dans la semelle talon assure l''amorti emblématique de la ligne. Les overlays en TPU et le logo Swoosh surdimensionné Futura créent une signature distinctive moderne. Les perforations stratégiques assurent respirabilité, tandis que la semelle extérieure en caoutchouc garantit durabilité. Cette édition exclusive marie héritage running et esthétique streetwear contemporaine.', 4, '{}');
INSERT INTO public."Product" VALUES (67, 'samba', '', 'Core Black Wonder White', '2023', 8900, 'f2ory8bwxnhwv5xqahf6capppccz.webp', '{01-f2ory8bwxnhwv5xqahf6capppccz.webp,02-urtp613ueo2etdb9z76npmdbc02p.webp,03-ygagk18faoy42k76x2hyrfi2umo4.webp,04-zd1rj9pl831dkccy2sf935ifcdni.webp,05-jld1gis2lpclexjoa2rvp23st0c6.webp,06-ntzp8l9khuyakftgcwagajlceedq.webp,07-9t913i6bcxalobvgl4p8o9r7rx1o.webp}', NULL, 'WOMEN', 1, 'La Adidas Samba « Core Black Wonder White » 2023 revisite le classique intemporel avec une tige en cuir noir premium contrastée par les trois bandes blanches emblématiques. L''empiècement en daim sur l''avant-pied et les perforations latérales assurent respirabilité et style. La languette en cuir avec logo Adidas doré ajoute une touche d''élégance. La semelle intermédiaire en caoutchouc gomme naturelle offre adhérence et durabilité, tandis que la silhouette basse épurée incarne l''héritage football d''Adidas avec une touche moderne.', 1, '{POPULAR,BEST_SELLER}');
INSERT INTO public."Product" VALUES (88, 'v2k run', '', 'Mink Brown Ironstone Team Anthracite', '2023', 15900, 'a74v22qf1g20hlto5pst5egob9e0.webp', '{01-a74v22qf1g20hlto5pst5egob9e0.webp,02-3riv7peq3y5u5av5f8pln756xivb.webp,03-xf0m06b3rpvh716scnfus4zwfe8m.webp,04-1m5zp63vqar12nvctd0ospl028ki.webp,05-a5teeigfvb6ftbndhsuu5gfkefbk.webp,06-zdjlnli1jb7x1f2mjr001ut3d71k.webp,07-hmb1ik8hnzph6ubr36c1vn5nngwn.webp}', NULL, 'WOMEN', 11, 'La Nike V2K Run « Mink Brown Ironstone Team Anthracite » 2023 présente une palette terreuse sophistiquée inspirée de la nature. La tige en mesh technique combine des tons marron vison, pierre ferrugineuse et anthracite pour un look multicouche. Les overlays synthétiques et découpes Y2K créent une silhouette dynamique et moderne. La semelle intermédiaire volumineuse offre un amorti optimal, rehaussée par des accents contrastés. Les détails réfléchissants et la semelle extérieure sculptée complètent cette version polyvalente qui fusionne performance et style urbain contemporain.', 4, '{}');
INSERT INTO public."Product" VALUES (89, 'gel kayano', '14', 'WHITE MIDNIGHT', '2023', 15900, '3y93ynje7kkabduefgdkosk8uoy3.webp', '{01-3y93ynje7kkabduefgdkosk8uoy3.webp,02-5lv7xb716vekhngkifzid3r0iamg.webp,03-r19pn38lilzfbypeldmbee5bw4yk.webp,04-4afhiyezongdj1ka6x30p520wjx2.webp,05-a34mogsea94z6m216uee5ages60j.webp,06-xuztqcwgr8bkb44zmnpk083cvsrg.webp,07-xk8ofnzx4w59j5hdk19aiuw3o1l3.webp}', NULL, 'WOMEN', 3, 'La ASICS Gel Kayano 14 « White Midnight » 2023 marie élégance classique et touches sombres sophistiquées. La tige en mesh blanc technique est rehaussée d''overlays bleu minuit profond qui créent un contraste saisissant. Le système de lacets asymétrique et les panneaux réfléchissants ajoutent une dimension futuriste. La technologie GEL stratégiquement placée offre un amorti supérieur, complétée par une semelle intermédiaire sculptée. Cette version bicolore allie l''héritage performance ASICS et l''esthétique Y2K pour un style urbain contemporain et polyvalent au quotidien.', 2, '{}');
INSERT INTO public."Product" VALUES (8, 'air jordan', '4', 'Rare Air White Lettering', '2025', 19900, '4mtba66tgtn6i7edv6q1qxhlfy4t.webp', '{01-4mtba66tgtn6i7edv6q1qxhlfy4t.webp,02-083qsux52a20ql63huk592hvm90n.webp,03-yi1s5zmxp8sd75z36j8k1ks3l7dj.webp,04-g83rsu7m7114f3f9rjut1md06nl9.webp,05-nq2274dpjaic5h0cn55edh4twvco.webp,06-6glq8jtfamwbqvmje74ydgi2q2fx.webp,07-n18x61k9k8zc1z0wktbp75v15t0m.webp}', NULL, 'MEN', 3, 'La Air Jordan 4 « Rare Air White Lettering » 2025 réinvente le classique avec un design épuré et moderne. La tige en cuir blanc premium est rehaussée de détails gris subtils sur les panneaux latéraux. Le lettrage « Rare Air » distinctif sur les supports de laçage crée une signature unique. Le logo Jumpman sur la languette et les mesh respirants maintiennent l''ADN authentique. La semelle intermédiaire visible avec technologie Air offre un amorti exceptionnel, complétée par une semelle extérieure translucide pour un look contemporain et polyvalent au quotidien.', 3, '{}');
INSERT INTO public."Product" VALUES (24, 'air trainer', 'huarache', 'Cool Blue Black', '2025', 27900, 'j9ycepu63t5ccfg67bdaefy57hzg.webp', '{01-j9ycepu63t5ccfg67bdaefy57hzg.webp,02-cx06zhcecwwi52r0ld9dgbtx6l9u.webp,03-k8l7heh2ut9hjygwc3cb73hy9puf.webp,04-hhtj1hmdhtbtm6pbqcor4ikn0mgp.webp,05-wzw6ybaf1b1aou46mi8b4thsml5w.webp,06-v6zgc4s2ad5nc00ivlt1kz08fy29.webp,07-g8qhgniqgod4q8q0keia88pq1crx.webp}', NULL, 'MEN', 6, 'La Nike Air Trainer Huarache « Cool Blue Black » 2025 revisite l''iconique cross-trainer des années 90. La tige combine mesh respirant noir et overlays synthétiques avec des accents cool blue vibrants', 4, '{}');
INSERT INTO public."Product" VALUES (21, 'sb', 'dunk low', 'Supreme Black', '2025', 21900, 'rifr20hir7g8nc5tym5yc9wb8cu3.webp', '{01-rifr20hir7g8nc5tym5yc9wb8cu3.webp,02-sstpfqiukz23rb9lf6279ipaody5.webp,03-17b0anoxq6wla5wjizfkxfzjq30x.webp,04-80gyihh0kpfrxbhjmjikngcs6d99.webp,05-ahgoy3sz9mgdy86t431zko3lphn4.webp,06-0c5kpg4c202gwui6vjutgu2nmf55.webp,07-n9rl15cghdg0ye4isvqgjen20jpl.webp}', NULL, 'MEN', 1, 'La Nike SB Dunk Low « Supreme Black » 2025 célèbre la collaboration iconique avec des détails premium exclusifs. La tige en cuir noir de qualité supérieure est rehaussée par le branding Supreme distinctif. Les finitions soignées et les matériaux luxueux reflètent l''exclusivité de cette édition limitée. La languette rembourrée et la semelle Zoom Air offrent confort optimal pour le skateboard. La semelle extérieure en caoutchouc garantit adhérence exceptionnelle. Cette pièce collector ultra-recherchée marie l''héritage Nike SB et l''esthétique Supreme pour un statut emblématique dans la culture streetwear.', 4, '{}');
INSERT INTO public."Product" VALUES (11, 'air jordan', '4', 'Nigel Sylvester Brick by Brick', '2025', 44900, '6nz4j37zkxxo0ldamyhkso6oqyyh.webp', '{01-6nz4j37zkxxo0ldamyhkso6oqyyh.webp,02-r6xvnbm5kfntqyjhn6mg3st4zl8j.webp,03-e52vmqfbvnfudv1t7ntj51isjvzw.webp,04-gp0jwmwih9nq84g31pl13by3j4uy.webp,05-wfh5e29e179rvxu31clbhspgpa8q.webp,06-p6birqzkzh4dr11rbceqo0e4h4ry.webp,07-3mlmvvr9nha9hpupvadwqkb2un07.webp}', 'og', 'MEN', 5, 'La Air Jordan 4 OG « Nigel Sylvester Brick by Brick » 2025 célèbre la collaboration exclusive avec le pro BMX rider. Cette édition limitée présente une tige en cuir premium avec des détails inspirés de l''architecture urbaine et du skateparks. Les textures variées et les accents colorés créent une signature distinctive personnelle. Le logo Jumpman et les éléments de branding Nigel Sylvester ajoutent authenticité. La semelle intermédiaire avec technologie Air garantit performance optimale. Cette pièce collector marie culture BMX et héritage Jordan pour un style streetwear unique et recherché.', 3, '{OUR_PICK}');
INSERT INTO public."Product" VALUES (20, 'air jordan', '10', 'Steel', '2025', 33900, '4b6ahn7d3r4h1979rgtweodejoo2.webp', '{01-4b6ahn7d3r4h1979rgtweodejoo2.webp,02-oomn4jlyui7k9evdf0a9pta9rm91.webp,03-z9mggm91di3munnjgsyelu2j330s.webp,04-uvg09yhb1krui7b6g4ru6za2njtf.webp*,05-wmvq3zqc30i8sx6icdcwm50qx23o.webp,06-qtni2z0mq9eolw0nupj54xkc4v7q.webp,07-048g8lvahxvpvzj428u28nraqcul.webp}', NULL, 'MEN', 2, 'La Air Jordan 10 « Steel » 2025 revisite le modèle emblématique avec une palette métallique sophistiquée. La tige en cuir premium présente des tons acier et gris anthracite pour un look industriel raffiné. Les rayures caractéristiques sur la semelle intermédiaire et les détails brodés créent une signature distinctive. Le logo Jumpman sur la languette et la semelle extérieure en caoutchouc texturé complètent le design. La technologie Air dans la semelle assure un amorti optimal. Cette version élégante marie héritage performance et esthétique urbaine contemporaine pour un style polyvalent.', 3, '{}');
INSERT INTO public."Product" VALUES (5, 'air jordan', '5', 'Grappe 2025', '2025', 17900, 'dlt09y05bfxwwfcin31p0259l5n3.webp', '{01-dlt09y05bfxwwfcin31p0259l5n3.webp,02-c7qbvguvgyaxaz8elubs8r8sxq9j.webp,03-a1vweg6syskluidfxwobiyratkq2.webp,04-inlnrwcadev36m76y4iqr4y5f0h0.webp,05-uca3apya27gts078afers74lpebl.webp,06-bqotg8z191zn83ksvnn33gb30rev.webp,07-ipw64onarpnsketnehehr6awfpb8.webp}', 'Retro OG', 'MEN', 3, 'La Air Jordan 5 Retro OG « Grappe » 2025 arbore une palette violette audacieuse inspirée du raisin. La tige en cuir premium présente des tons grape riches et profonds rehaussés par des détails noirs contrastés. Le mesh translucide sur les panneaux latéraux et le logo Jumpman sur la languette maintiennent l''ADN emblématique. Les ailettes réfléchissantes caractéristiques ajoutent une dimension moderne. La semelle intermédiaire visible avec technologie Air garantit un amorti exceptionnel. Cette édition vibrante marie l''héritage Jordan et une esthétique contemporaine audacieuse pour un look urbain distinctif.', 3, '{}');
INSERT INTO public."Product" VALUES (1, 'air jordan', '4', 'cave stone', '2025', 19900, 'b747a513-a57a-4aee-bb5c-fd5faa744bef.webp', '{01-3693ab20-951b-4993-a67c-eb29b4a76192.webp,02-fd2d1316-9a28-49cf-8241-ad25d2e29b97.webp,03-12c2123d-4817-4cff-b04a-aa26442105a6.webp,04-63c2b3a8-7f9d-4572-9b2d-8d0255ac4f20.webp,05-6cf6e8fb-56d5-4e8b-b76e-e5891fc9b1d5.webp,06-8af85af1-3c2f-466c-bf6d-f427363b6a67.webp,07-9e6b0c74-3cb6-49a7-9660-f8dfe2b5e590.webp}', NULL, 'MEN', 11, 'La Air Jordan 4 « Cave Stone » 2025 présente une palette terreuse inspirée des formations rocheuses naturelles. La tige en cuir premium et nubuck combine des tons beige pierre et marron cave pour un look organique sophistiqué. Les supports de laçage et le mesh respirant sur les panneaux latéraux maintiennent l''ADN authentique. Le logo Jumpman sur la languette et les détails ton sur ton créent une esthétique cohérente. La semelle intermédiaire visible avec technologie Air assure un amorti optimal, tandis que cette version neutre et polyvalente s''intègre parfaitement au quotidien urbain.', 3, '{}');
INSERT INTO public."Product" VALUES (57, 'air jordan', '5', 'Black Metallic Reimagined', '2025', 15900, 'e6gcim1wdddwj2hvyh8unqg7l3ei.webp', '{01-e6gcim1wdddwj2hvyh8unqg7l3ei.webp,02-o2otiffm9ugumxykzy7wtf4rdb0e.webp,03-x7c432f05ni9wa04mbv6rpdr7u4e.webp,04-qt4qn1mo2pe5ycv2t7v3v8qp7oiw.webp,05-ifqedk0vvg46anr7iuycqkvg5fdo.webp,06-2i2vt0tj6f7m1yrogd2i9kmjsz9y.webp}', 'retro og ps', 'BOY', 1, 'La Jordan Air Jordan 5 « Black Metallic Reimagined » 2025 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Sortie en édition retro og ps, elle séduira les collectionneurs et.', 3, '{}');
INSERT INTO public."Product" VALUES (64, 'samba', 'og', 'Leopard Core Black', '2025', 9900, '46j2a7auot8ycb49awkb8myty853.webp', '{01-46j2a7auot8ycb49awkb8myty853.webp,02-7u6ej2iu651jlhb13wdjdbc7qmp7.webp,03-tbtkcsl4l7yzds1qre7mrue2rhir.webp,04-aibsw9b5n443xhocdh4a5fandtzx.webp,05-glokd0bjqk32i6xs2ftdsjzdfd8h.webp,06-4l43lae9tlnz91mr3x9wexvqokh0.webp,07-cehmdap9zzvt5sribtdhhd1sym4z.webp}', NULL, 'WOMEN', 1, 'La Adidas Samba OG « Leopard Core Black » 2025 apporte une touche sauvage au classique intemporel. La tige présente un motif léopard audacieux sur fond noir profond qui crée un look animalier sophistiqué. Les trois bandes emblématiques noires se fondent dans le design pour une esthétique cohérente. L''empiècement en daim sur l''avant-pied et la semelle en gomme naturelle conservent l''ADN authentique. Cette édition exclusive transforme l''héritage football en statement sneaker contemporaine qui marie élégance animale et style urbain affirmé pour un look unique au quotidien.', 1, '{NEW_ARRIVAL}');
INSERT INTO public."Product" VALUES (6, 'air jordan', '4', 'white cement 2025', '2025', 24900, 'ewxxzwhnq4duhocnuxd5l7afq6f6.webp', '{01-ewxxzwhnq4duhocnuxd5l7afq6f6.webp,02-upqii5njtpkc2ch707wnjpgdpgl8.webp,03-d9weiy2zutulb2yoh484qugmutj9.webp,04-cop0j4or3kqnobcpiix0818wue15.webp,05-1kbh6bomd5h5fku33art8kmymhg7.webp,06-ocait5ch8tz4x9fm8p26e4yxjx3o.webp,07-6fv21w00i2z38o2kmrnc8u67f2vd.webp}', 'OG', 'MEN', 3, 'La Air Jordan 4 OG « White Cement » 2025 célèbre le design original iconique de 1989. La tige en cuir blanc premium est rehaussée par les célèbres splatter gris ciment sur la semelle intermédiaire et les supports de laçage. Le logo Nike Air original sur le talon rend hommage à l''authenticité historique. Les panneaux latéraux en mesh noir et le logo Jumpman sur la languette complètent l''esthétique classique. La semelle intermédiaire visible avec technologie Air assure un amorti optimal. Cette réédition fidèle incarne l''essence du patrimoine Jordan avec un respect total pour l''original.', 3, '{POPULAR,BEST_SELLER,OUR_PICK}');
INSERT INTO public."Product" VALUES (95, 'gel kayano', '14', 'Cloud Grey', '2024', 17900, 'rzpa0h3gulwv0bqv2v3jwx5d9qeu.webp', '{01-rzpa0h3gulwv0bqv2v3jwx5d9qeu.webp,02-iq18qf9sryx20v1ua3dfsbcxm8hc.webp,03-w6csnee4k8mxt7di8h97dkrzc4um.webp,04-amd8iwnv9986ori44muzqzv3y6t2.webp,05-s02lj0zhurtwy512raoy3kerupdj.webp,06-61llo7fgq8witqq3iwe8cj9r60rx.webp,07-i0flo0v8rlc86lav2r1itjy2mo0o.webp}', NULL, 'WOMEN', 2, 'La ASICS Gel Kayano 14 « Cloud Grey » 2024 célèbre les nuances aériennes avec une palette grise vaporeuse apaisante. La tige en mesh technique présente des overlays synthétiques dans différentes tonalités de gris nuage. Le système de lacets asymétrique et les panneaux réfléchissants créent un look futuriste distinctif. La technologie GEL généreusement répartie garantit un amorti premium et confort maximal. Les détails texturés et la semelle intermédiaire sculptée complètent cette version épurée qui marie l''héritage ASICS et l''esthétique Y2K pour un style urbain sophistiqué et polyvalent.', 2, '{}');
INSERT INTO public."Product" VALUES (96, 'gt 2160', '', 'Camel Beige', '2024', 17900, '9k7hdmw1mdf1y6j57u7c5jn6j6ew.webp', '{01-9k7hdmw1mdf1y6j57u7c5jn6j6ew.webp,02-7rhpwbju2fo5xspifxw50lkmlvnz.webp,03-3uzi1mjonw7utrjn26labal0vgbs.webp,04-p0l01bpj1vpno4z4rtxgh3orsnhv.webp,05-pjofvtkkcaumd20i7u6kfv6pr51j.webp,06-fewmj64fj83z7czizkycrtiucf7m.webp,07-nolv5gl4rqxdp8h8a3bv4n59sia6.webp}', NULL, 'WOMEN', 12, 'La ASICS GT-2160 « Camel Beige » 2024 présente une palette désertique chaleureuse et sophistiquée. La tige combine mesh respirant et overlays en cuir synthétique dans des tons camel et beige sable. Les découpes techniques caractéristiques et les détails de branding ASICS créent une signature distinctive. La technologie GEL dans la semelle offre un amorti exceptionnel, complétée par une semelle intermédiaire avec support de stabilité. Cette version neutre et élégante marie performance technique et esthétique minimaliste contemporaine pour une polyvalence quotidienne raffinée et confortable.', 2, '{}');
INSERT INTO public."Product" VALUES (98, 'gel nimbus', '9', 'White Oatmeal', '2023', 24900, 'uqj7fi1144j34dqy3ul6ysnhxbi5.webp', '{01-uqj7fi1144j34dqy3ul6ysnhxbi5.webp,02-txrh1qkhwu5aojwm81mde36uuhko.webp,03-uvmbcejm6cqg3czu9thks1olo8on.webp,04-0pz1omesl1q56axttn95w5imu9e3.webp,05-t4qsihmx3d7sujn98bvudj6jfv3k.webp,06-oo6bw3wl8n30zgz5wxcgoulctiul.webp,07-jagc1ik233fvt5kz4qojz3i625ol.webp}', NULL, 'WOMEN', 7, 'La ASICS Gel Nimbus 9 « White Oatmeal » 2023 célèbre la douceur naturelle avec une palette blanc crème apaisante. La tige en mesh respirant est rehaussée d''overlays en cuir synthétique dans des tons oatmeal chaleureux. Les découpes techniques et les détails texturés créent un look organique sophistiqué. La technologie GEL généreusement distribuée garantit un amorti premium et confort maximal pour les longues journées. La semelle intermédiaire sculptée et la semelle extérieure AHAR+ assurent durabilité exceptionnelle. Cette version épurée marie performance et minimalisme contemporain élégant.', 2, '{}');
INSERT INTO public."Product" VALUES (23, 'sb', 'dunk low', 'Supreme Ocean Fog', '2025', 26900, 'f110ifiyca4v7nh2ifcs9jr5ci5v.webp', '{01-f110ifiyca4v7nh2ifcs9jr5ci5v.webp,02-idxmtuuq2i53q7fvcvye54ndd7wz.webp,03-7wjrvmz3o8e24yz4nocufhiel64i.webp,04-ab98s7jgbsyp0sdhe639lgg243ea.webp,05-mkoqlwbrkeceoyc12m586fr6md2v.webp,06-ms5ge9f5zim7tw6vpnfc2x2i72m0.webp,07-olv3mm1dr0tckautboukmw89sw5i.webp}', NULL, 'MEN', 6, 'La Nike SB Dunk Low « Supreme Ocean Fog » 2025 célèbre la collaboration exclusive avec une palette marine apaisante. La tige en cuir premium présente des tons ocean fog bleutés sophistiqués rehaussés par le branding Supreme distinctif. Les finitions soignées et les matériaux de qualité supérieure reflètent l''exclusivité de cette édition limitée ultra-recherchée. La languette rembourrée et la semelle Zoom Air garantissent confort optimal pour le skateboard. La semelle extérieure en caoutchouc assure adhérence exceptionnelle. Cette pièce collector marie l''univers Nike SB et l''esthétique Supreme pour un statut emblématique.', 4, '{}');
INSERT INTO public."Product" VALUES (51, 'air jordan', '11', 'barerly volt', '2025', 19900, 'ctxdifxjys4z0mehwnls9z9r40jw.webp', '{01-ctxdifxjys4z0mehwnls9z9r40jw.webp}', 'gs', 'BOY', 4, 'La Jordan Air Jordan 11 « Barerly Volt » 2025 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Sortie en édition gs, elle séduira les collectionneurs et les amateurs de pièces.', 3, '{}');
INSERT INTO public."Product" VALUES (26, 'air max', '1', 'Travis Scott Baroque Brown', '2021', 32900, 'u4kc1w6iit9c7om7z0r0qhcdvhro.webp', '{01-u4kc1w6iit9c7om7z0r0qhcdvhro.webp,02-nsgb7rlv7veungfqjjug6ofugapn.webp,03-dadjs2ubpb7kctesajb3iwqddonk.webp,04-duj48bvpx8accw0fq6xpnipwjyjl.webp,05-iu1ianuc9shex0htwvzzfbddfhzj.webp,06-111wpy8c2ppq92wkm8gmusdv9vnd.webp,07-w9a4f3qvs2fr1mnt64vs5lv6r7b8.webp}', NULL, 'MEN', 9, 'La Nike Air Max 1 « Travis Scott Baroque Brown » 2021 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Disponible pour un public masculin. Un design soigné, un confort maîtrisé et une finition pensée pour durer.', 4, '{}');
INSERT INTO public."Product" VALUES (29, 'samba', 'og', 'Sand Strata Magic Beige', '2025', 9900, 'aadlu41qlmswabqlk5scb8batdsg.webp', '{01-aadlu41qlmswabqlk5scb8batdsg.webp,02-fks1dng4lgr4t36xuoft11rw4t9f.webp,03-fo1slvhiawqb2e9r93petpuevi4j.webp,04-bnlrqeqlnokrop3oaatlzi5domue.webp,05-kbfdmczay7ewa0y2bdmrheay8rbc.webp,06-jq4jdrz4qov327btf72s3bivivn0.webp,07-awe0q8r1z1cl4qzjo6luaazaj5qt.webp}', NULL, 'MEN', 3, 'La Adidas Samba Og « Sand Strata Magic Beige » 2025 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Disponible pour un public masculin. Un design soigné, un confort maîtrisé et une finition pensée pour durer.', 1, '{}');
INSERT INTO public."Product" VALUES (34, 'gel', '1130', 'White Pure Silver', '2024', 13900, 'nbd4vytb43dm09clff1ut2ttoi14.webp', '{01-nbd4vytb43dm09clff1ut2ttoi14.webp,02-0f3toash94edwepcdr6p4lk062nv.webp,03-biqzhk8b7ewnhk5l2pwhs2dlxgc0.webp,04-p6zbmmj3l910g9j3u9pk8o2r8chp.webp,05-szqcezrfuy7eszrgchunktpbv3yg.webp,06-8dzf7zscom6ew8bv891tzp83jrt7.webp,07-piiznxluqljg6jlk483zgiver3b1.webp}', NULL, 'MEN', 3, 'La Asics Gel 1130 « White Pure Silver » 2024 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Disponible pour un public masculin. Un design soigné, un confort maîtrisé et une finition pensée pour durer.', 2, '{}');
INSERT INTO public."Product" VALUES (35, 'gel', '1130', 'Kale Green', '2023', 9900, 'vjuqodo1yfs6b82wxdtgz7l09xja.webp', '{01-vjuqodo1yfs6b82wxdtgz7l09xja.webp,02-s82ut6gvqwv8kyu2zw9ubenhr9hn.webp,03-6m9t7y7sq8dnzd4zj79gyhyhgpnc.webp,04-oz7s2274hjs5sa2wezbrcyqr8uv1.webp,05-w5k3n37h921dk2nbz7jc01on140p.webp,06-5pfd3e06lpgi2vpvjulzg0gdbu7n.webp,07-wct0ct4ybhwznqv99t4n293ly0ur.webp}', NULL, 'MEN', 8, 'La Asics Gel 1130 « Kale Green » 2023 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Disponible pour un public masculin. Un design soigné, un confort maîtrisé et une finition pensée pour durer.', 2, '{}');
INSERT INTO public."Product" VALUES (37, 'gel kayano', '14', 'BIRCH DARK PEWTER', '2023', 14900, 'z1i0kzwtcscc22ezkdsxhgt5bzlk.webp', '{01-z1i0kzwtcscc22ezkdsxhgt5bzlk.webp,02-i17lnav6eamrt17374ama20xmpo9.webp,03-i8urq2cq9dmw0r5bbqta33wjrv34.webp,04-dj5dqw6a6rk8c7go760io5jvry8r.webp,05-ie0vp3immvap7gsd1hu0hsuqa669.webp,06-9j0e3gb0hg3et8qrt4p1iy8k8oj9.webp,07-b1bbmm575k1leu9e5omnbezjvn7n.webp}', NULL, 'MEN', 3, 'La Asics Gel Kayano 14 « Birch Dark Pewter » 2023 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Disponible pour un public masculin. Un design soigné, un confort maîtrisé et une finition pensée pour durer.', 2, '{}');
INSERT INTO public."Product" VALUES (42, '9060', '', 'Black Castlerock', '2022', 12900, 'ceik1tr01k5oqpb3uxdziknfivii.webp', '{01-ceik1tr01k5oqpb3uxdziknfivii.webp,02-eqd96zz0nxvqcg8blhtp22n7vlt2.webp,03-unxehfsq5cto3og2qstjc1he8jq1.webp,04-krdi8nzojpo7aywclqa37bet8xrj.webp,05-fn40uurlr6agut73wscwd4s2p84s.webp,06-ejwuzp2pz4n4e8rlzdzud2foxc3m.webp,07-vgypfqgf5qs7p7ud5h3gvt5ucvoh.webp}', NULL, 'MEN', 1, 'La New_Balance 9060  « Black Castlerock » 2022 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Disponible pour un public masculin. Un design soigné, un confort maîtrisé et une finition pensée pour durer.', 5, '{}');
INSERT INTO public."Product" VALUES (43, '9060', '', 'Sea Salt Raincloud', '', 11900, 'zoi88bp0740u7ooeo63nrx6f29zu.webp', '{01-zoi88bp0740u7ooeo63nrx6f29zu.webp,02-7ntd3wvy1o0kc4s5knz64u90wh2o.webp,03-003pfpa8odut2zr81hgtun1t0hok.webp,04-v9xt3utf3vm1oc77mqki3iubmbmf.webp,05-2bss3nuv4l70oso3fhrvkw2dqvpm.webp,06-8tu2p7fzrnr89tehlw31m3qt27rr.webp,07-78v9bsig59v5dbqnx6ys4dx2mhku.webp}', NULL, 'MEN', 3, 'La New_Balance 9060  « Sea Salt Raincloud »  revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Disponible pour un public masculin. Un design soigné, un confort maîtrisé et une finition pensée pour durer.', 5, '{}');
INSERT INTO public."Product" VALUES (45, '1000', '', 'All Black', '2024', 9900, '43s6ynwglds2i9frnbtdtbwiv5rx.webp', '{01-43s6ynwglds2i9frnbtdtbwiv5rx.webp,02-mlkvauc9pniqg89vjqi1np370cz8.webp,03-9kymspl1yp2ym6tig1utabrw6gix.webp,04-qrw0mf0lrum5rn9483j2e3dbzig0.webp,05-fw57ajwemrq6m4miqcy4sf1026f8.webp,06-v325kew2fh3phb2khjoiuryv3gyb.webp,07-hbfqsbqr4nknljsw97sdxsd8p0c4.webp}', NULL, 'MEN', 1, 'La New_Balance 1000  « All Black » 2024 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Disponible pour un public masculin. Un design soigné, un confort maîtrisé et une finition pensée pour durer.', 5, '{}');
INSERT INTO public."Product" VALUES (46, '530', '', 'Brown Tan', '2024', 12900, '46p0tkeoz2373p14eb20bl8g0x2o.webp', '{01-46p0tkeoz2373p14eb20bl8g0x2o.webp,02-i5ge5bg85pf4pl0a18z1kbfvogr3.webp,03-qjoxde3v4k0ukw8etcl48bavjpuj.webp,04-x6qwjb2b6193tp877try70shr1ix.webp,05-ttl4jfij1y606q6zqslajqrxrld7.webp,06-cs7gpki5hh1hiibsuvgezdq6g.webp,07-yffsjq7a3g3m5jmek6abfh9roc7q.webp}', NULL, 'MEN', 9, 'La New_Balance 530  « Brown Tan » 2024 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Disponible pour un public masculin. Un design soigné, un confort maîtrisé et une finition pensée pour durer.', 5, '{}');
INSERT INTO public."Product" VALUES (48, '9060', '', 'Blacktop Dark Moss Black', '2023', 22900, 'p7qdji34dzn56uq05sl59fxihieo.webp', '{01-p7qdji34dzn56uq05sl59fxihieo.webp,02-3gbeta8njcyciax6ej36u2fjd149.webp,03-1uhrg4emb4o54vjaxgfsot260dqa.webp,04-6mfop5yoei01t2zg8o2iqwm4nre3.webp,05-8ca0apjigfx9ebpa3izq8i09eykc.webp,06-xqfih5q1jxv51ez30l8hvxfzdjcr.webp,07-bbby92eqq193uxvt7xdgdru1t3gf.webp}', NULL, 'MEN', 1, 'La New_Balance 9060  « Blacktop Dark Moss Black » 2023 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Disponible pour un public masculin. Un design soigné, un confort maîtrisé et une finition pensée pour durer.', 5, '{}');
INSERT INTO public."Product" VALUES (49, 'air jordan', '4', 'white cement', '2025', 15900, 'e3efx4l83jlxxhc2lx514uij8vgo.webp', '{01-e3efx4l83jlxxhc2lx514uij8vgo.webp,02-6bibqegn9jh1qwepxsdr12efo7cc.webp,03-cv1lvprmc06kj802u151nxnm7i3m.webp,04-dsan28ssbj0ztnwg5s5lny1ne1h8.webp,05-esrou1cezjx45zc7n4sk13gigx4n.webp,06-2ho5jbd6jdl80cr3m7uxvieh8wop.webp,07-7qkmr9kmjxlgyjdcxajxdqbin6w7.webp}', 'retro gs', 'BOY', 3, 'La Jordan Air Jordan 4 « White Cement » 2025 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Sortie en édition retro gs, elle séduira les collectionneurs et les amateurs de.', 3, '{}');
INSERT INTO public."Product" VALUES (50, 'air jordan', '4', 'rare air', '2025', 15900, '6bnze0i59zpt73dwqs985maukj9a.webp', '{01-6bnze0i59zpt73dwqs985maukj9a.webp,02-80ua0e034p2qlgrmku3977inj6be.webp,03-stbpj76lfo72r3hldyth64osz6k3.webp,04-zk0llbx0zypnn501q90e4ghjp6q4.webp,05-658yo2rgcm5lpqw28moi2y7g3d0c.webp,06-351mtx649tmd5w1dn6hs38e5uycs.webp,07-uj1vme3whjbzu6g2cbxkkk1s3czr.webp}', 'gs', 'BOY', 3, 'La Jordan Air Jordan 4 « Rare Air » 2025 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Sortie en édition gs, elle séduira les collectionneurs et les amateurs de pièces.', 3, '{}');
INSERT INTO public."Product" VALUES (44, '9060', '', 'Dark Olivine', '2025', 13900, '37y1vbx1x7sfh7rjl5jbbdy3evkx.webp', '{01-37y1vbx1x7sfh7rjl5jbbdy3evkx.webp,02-ncrbt8vqr5ah7rjl6sydockepuqp.webp,03-cnp8vqrfawp28ck9o0kxgalejeai.webp,04-lnr5qipogrvmk09lz3hkpvgap9s3.webp,05-lbybfvv1fpuuk4gk6kd3qx4ezd4o.webp,06-ucx6kngse4r2lyfktqy8zsvai89o.webp,07-92pz2d0keqsrgnwcbjnwhdneqe5h.webp}', NULL, 'MEN', 8, 'La New_Balance 9060  « Dark Olivine » 2025 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Disponible pour un public masculin. Un design soigné, un confort maîtrisé et une finition pensée pour durer.', 5, '{OUR_PICK}');
INSERT INTO public."Product" VALUES (58, 'air jordan', '4', 'Pizza', '2025', 18900, 'tkzpc9vdf8mqc33mqtojctk9o9h9.webp', '{01-tkzpc9vdf8mqc33mqtojctk9o9h9.webp,02-uf0n9xpjhywti3l0pmweeeln068w.webp,03-n7xl4ba2h278udmdkxt205g2457u.webp,04-543awtizt758sei8oulksvenj7jx.webp,05-a4bns288brop08pfza7uh480fho3.webp,06-ii27vyp0ts5ga8wwna513q2dzj97.webp,07-miwgdszumzwrhltit3i8prau4fpl.webp}', 'gs', 'BOY', 9, 'La Jordan Air Jordan 4 « Pizza » 2025 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Sortie en édition gs, elle séduira les collectionneurs et les amateurs de pièces.', 3, '{}');
INSERT INTO public."Product" VALUES (52, 'air jordan', '4', 'white thunder', '2024', 29900, '957l7b0dsdf9c634vob9nh3rq4m7.webp', '{01-957l7b0dsdf9c634vob9nh3rq4m7.webp,02-gz536pdqcqqe917cehmgpcd6bprs.webp,03-as4sxpwz5tkkca9ie20vit36wne8.webp,04-uanr4j1jwja0m8n06u4lbt3n3ntc.webp,05-pdl9mykkqi96sb41hej7gv9g97uk.webp,06-jhxudjglg7w89aexqvih4hwg4ha8.webp,07-kkoy04x2n536fxjsy87hj7alwifc.webp}', 'retro gs', 'BOY', 3, 'La Jordan Air Jordan 4 « White Thunder » 2024 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Sortie en édition retro gs, elle séduira les collectionneurs et les amateurs de.', 3, '{}');
INSERT INTO public."Product" VALUES (53, 'air jordan', '3', 'black cat', '2025', 15900, 'vljyul04j4wr2o26lknizz6swuno_54401531-6816-415b-a2b8-ec86ea6ac370.webp', '{01-vljyul04j4wr2o26lknizz6swuno_54401531-6816-415b-a2b8-ec86ea6ac370.webp,02-qjnc1chhk46svrhwjnaca0k4wvjb.webp,03-g5q5em9wjirmc6k5zhqnm2wc9qvp.webp,04-2y5qiyguu9nkeqcgxpw60whqkfph.webp,05-16fehnfnritndc5lxt9ox5lc7imt.webp,06-r5z2if9xhj30hkwvu707k72j9o4e.webp,07-3c9jc8n5exbpu32tu5p0d5r8f3vw.webp}', 'gs', 'BOY', 1, 'La Jordan Air Jordan 3 « Black Cat » 2025 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Sortie en édition gs, elle séduira les collectionneurs et les amateurs de pièces.', 3, '{}');
INSERT INTO public."Product" VALUES (54, 'air jordan', '5', 'Fire Red Black Tongue 2025', '2025', 12900, 'r48o363p16rxrd7x3pf1kjk6vbza.webp', '{01-r48o363p16rxrd7x3pf1kjk6vbza.webp}', 'gs', 'BOY', 9, 'La Jordan Air Jordan 5 « Fire Red Black Tongue 2025 » 2025 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Sortie en édition gs, elle séduira les collectionneurs et les.', 3, '{}');
INSERT INTO public."Product" VALUES (55, 'air jordan', '4', 'Bred Reimagined', '2023', 15900, '84e516vvhh4xsk9wspi53sd1o40a.webp', '{01-84e516vvhh4xsk9wspi53sd1o40a.webp,02-r1v3l3qir3a65l6o5gtrno0a5olc.webp,03-nq462stc4ro1vscw7a4yy5tag051.webp,04-swbl5dgvpnzf8vf7w287y88x4tub.webp,05-r53yytxnwue4lo1h7hs8d5zwn0pi.webp,06-plu1hjf87hgd7obw8lr0arq6pchk.webp,07-dr7eql5c2h0fxutuaf967y47sv1w.webp}', 'gs', 'BOY', 1, 'La Jordan Air Jordan 4 « Bred Reimagined » 2023 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Sortie en édition gs, elle séduira les collectionneurs et les amateurs de.', 3, '{}');
INSERT INTO public."Product" VALUES (56, 'air jordan', '3', 'Pure Money 2025', '2025', 11900, 'x8tsphkz4ggagfsqgym0d0hjmgfw.webp', '{01-x8tsphkz4ggagfsqgym0d0hjmgfw.webp,02-stu8dmukfkv8leyzwzwr6y8dorai.webp,03-0408ao3f3og4whc91z9a3l80gg8h.webp,04-1pz8r3p1r8du6jknq987jwphlvxs.webp,05-w9b9nf7ko9qrlb95u80u6i78rmfj.webp,06-jqfg4oehea9kae7qjvr2od0ibiic.webp,07-pqal9gb0ckbmmkmgvrx8255hepiv.webp}', 'retro gs', 'BOY', 3, 'La Jordan Air Jordan 3 « Pure Money 2025 » 2025 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Sortie en édition retro gs, elle séduira les collectionneurs et les amateurs.', 3, '{}');
INSERT INTO public."Product" VALUES (61, 'samba', 'og', 'Maroon Off White Gum', '2025', 11901, '8zrov0uwcbf1afsg2fgo4mm7pc9i.webp', '{01-8zrov0uwcbf1afsg2fgo4mm7pc9i.webp,02-f3e3m636bcud03ohhdtt4czmyg67.webp,03-w0omceb4cftrq4c3xcor5bqklod8.webp,04-2of9ifiwpxjtft4pj7j9h8t3o729.webp,05-uh0aqm0qz280ywhe5tfg753j6g9h.webp,06-cjq4nddxuzt2tqegfdtnczu3r396.webp,07-ev1ihrbbztd5v0fyw7m21r3umckw.webp}', NULL, 'WOMEN', 9, 'La Adidas Samba Og « Maroon Off White Gum » 2025 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Disponible pour un public féminin. Un design soigné, un confort maîtrisé et une finition pensée pour durer.', 1, '{}');
INSERT INTO public."Product" VALUES (93, 'gel 1130', '', 'White Blue Fade', '2025', 7900, 'abqwrenxl7f289n6dwafz6b9kez6.webp', '{01-abqwrenxl7f289n6dwafz6b9kez6.webp,02-2050gvnhq7athw0kg3bdznprjsbp.webp,03-yln7hnn965zgwfvl7quewxmaq59h.webp,04-e4kkxe6zas63jej8g93wp9tcp0ng.webp,05-tkie14jrfkqvtuiiku9m14nhoqvy.webp,06-bclk9fcl24qmjkaaoy13i9pvuyll.webp,07-efqnckeyj76yliya4dpu786vlomp.webp}', NULL, 'WOMEN', 6, 'La ASICS Gel 1130 « White Blue Fade » 2025 présente un dégradé bleu aérien captivant sur fond blanc immaculé. La tige en mesh technique combine des overlays synthétiques qui passent du bleu ciel au bleu profond de façon harmonieuse. Les découpes latérales caractéristiques et les détails réfléchissants ajoutent une dimension moderne. La technologie GEL dans la semelle garantit un amorti exceptionnel et confort optimal. Cette version gradient transforme le classique running en pièce artistique contemporaine qui évoque légèreté et mouvement pour un style urbain frais et distinctif au quotidien.', 2, '{}');
INSERT INTO public."Product" VALUES (94, 'gel 1130', '', 'Cream Reddish Brown', '2024', 8900, '2c9bufif7a9lx17fvyx3grbvp8mp.webp', '{01-2c9bufif7a9lx17fvyx3grbvp8mp.webp,02-kx0p0bs4biyhd5gkqvy2xwxla5ed.webp,03-8womr9k7nbei3oi9bbpjjkpe3vvb.webp,04-703acongaa011l932c2kcm9r0ppm.webp,05-jclss1wjhl6lbs3ini1yol0ytele.webp,06-h7whcm8z3n14v9f8prk9zo2cl3ij.webp,07-ke27zpgswlxxcqqovro658pmk1kw.webp}', NULL, 'WOMEN', 11, 'La ASICS Gel 1130 « Cream Reddish Brown » 2024 marie douceur neutre et chaleur terreuse pour un look automnal sophistiqué. La tige en mesh combine des overlays synthétiques crème et marron rougeâtre qui créent un contraste harmonieux. Les découpes techniques et les détails texturés ajoutent profondeur et caractère. La technologie GEL stratégiquement placée offre un amorti supérieur pour un confort exceptionnel. La semelle intermédiaire sculptée complète cette palette organique. Cette version intemporelle marie héritage performance et esthétique minimaliste contemporaine pour une polyvalence quotidienne élégante.', 2, '{}');
INSERT INTO public."Product" VALUES (25, 'sb', 'dunk low', 'Wizard of Oz', '2024', 13900, 'l9u62nfi2m6w5o7oppl66nv8q3c6.webp', '{01-l9u62nfi2m6w5o7oppl66nv8q3c6.webp,02-t8tb1mayw3kkd45e20d07x87d3q6.webp,03-ti9xvcb6p8w05rcp2nfyx0c7skc3.webp,04-fzq3fc1sqpb9xra1yjek86ozrviu.webp,05-gppt4tnalx3858jgnmm0zn79gtih.webp,06-9c3lq9cva0b4x5eeqlf3q7xufano.webp,07-gtd5j3zmnnjn0h13gu4fahlscze0.webp}', NULL, 'MEN', 9, 'La Nike Sb Dunk Low « Wizard Of Oz » 2024 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Disponible pour un public masculin. Un design soigné, un confort maîtrisé et une finition pensée pour durer.', 4, '{}');
INSERT INTO public."Product" VALUES (30, 'gazelle', 'indoor', 'Aluminum Core Black', '2024', 7900, 'ri6ntactkawno8tqigv7iclj85c3.webp', '{01-ri6ntactkawno8tqigv7iclj85c3.webp,02-mxvxaqwzatmbp51xsmsnnzcvuhh4.webp,03-ndyms3vbdlv83wjj9w1vwb0qtwsk.webp,04-xps17qic2uvfmq6rphwtlgtjzd5b.webp,05-3poxbdzwlnf1p6b43ngtbhk94065.webp,06-qmd7fybeae09t0g3rjowgdnko7iz.webp,07-rpkvzhe2vavryajzqhg0smocftrs.webp}', NULL, 'MEN', 2, 'La Adidas Gazelle Indoor « Aluminum Core Black » 2024 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Disponible pour un public masculin. Un design soigné, un confort maîtrisé et une finition pensée pour durer.', 1, '{}');
INSERT INTO public."Product" VALUES (31, 'stan smith', '', 'White Navy', '2021', 8900, 'of5ndtxdfbnl906ttdd3y605xd1u.webp', '{01-of5ndtxdfbnl906ttdd3y605xd1u.webp,02-oojx1s9ay6zfz7v13llfwrxexxvg.webp,03-5epa0wckez93gblzyktqmxq3spg8.webp,04-lmukk5mlhw5s2cy5mqhjuwg2nni.webp,05-8488j1c26qxswevszfi11wemi7z2.webp,06-olxsn2wr5c936nnugmqzopdvhb6z.webp,07-zxkqr03x0f1oquauvy77344j8h9i.webp}', NULL, 'MEN', 3, 'La Adidas Stan Smith  « White Navy » 2021 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Disponible pour un public masculin. Un design soigné, un confort maîtrisé et une finition pensée pour durer.', 1, '{}');
INSERT INTO public."Product" VALUES (40, 'gel', '1130', 'White Dark Neptune', '2024', 17900, 'omh49pfx2icuwpwa5o5ymfjay7g8.webp', '{01-omh49pfx2icuwpwa5o5ymfjay7g8.webp,02-r4at718jw4ein9ozmvuc4z2fhom0.webp,03-h0utekhpmb1eyt08ory2vs0jla09.webp,04-99bf8hucxi2usssycsnpin0wql06.webp,05-99bf8hucxi2usssycsnpin0wql06.webp,06-w2gdtgelv5m63nsuv4ojdsvsvrh7.webp,07-lvdhrkk5rqgpeua3i11u49zkzour.webp}', NULL, 'MEN', 3, 'La Asics Gel 1130 « White Dark Neptune » 2024 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Disponible pour un public masculin. Un design soigné, un confort maîtrisé et une finition pensée pour durer.', 2, '{}');
INSERT INTO public."Product" VALUES (60, 'Handball Spezial', '', 'Earth Strata Gum', '2023', 9900, 'szcxgdna5xavwm3wya80of1i1cu7.webp', '{01-szcxgdna5xavwm3wya80of1i1cu7.webp,02-upqq3qm99re1kpm49xmc6y5ydxdm.webp,03-jmq87l30yngsjoooc94y2iwzkfy4.webp,04-4y8kuxuxhyjf0czerxqm9he38coe.webp,05-o3nl41tewhv4siljqj6a8f4z5bzz.webp,06-6et723yzkdcrxm0kekfei0ffpkqe.webp,07-90kdbp9f41ftb9f5oc4n7vtd59o5.webp}', NULL, 'WOMEN', 3, 'La Adidas Handball Spezial  « Earth Strata Gum » 2023 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Disponible pour un public féminin. Un design soigné, un confort maîtrisé et une finition pensée pour durer.', 1, '{}');
INSERT INTO public."Product" VALUES (62, 'samba', 'og', 'Silver Metallic Cracked Leather', '2024', 9900, 'rv4978g4vzzsltbkecvs3kmvtbbl.webp', '{01-rv4978g4vzzsltbkecvs3kmvtbbl.webp,02-g6dmbvg9dzi4i9ixdrg02noimcjz.webp,03-ayhu7kv8erum4x65pn2liwv64qmo.webp,04-hdjz0p48clkawths1k3sqto45cjm.webp,05-anygyjg74mby9smdasw1t7s1jjtd.webp,06-3ghnnm7mkode31ez15q1fcked2f6.webp,07-75t67wq29gs4vlz0vaww4chanaso.webp}', NULL, 'WOMEN', 2, 'La Adidas Samba Og « Silver Metallic Cracked Leather » 2024 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Disponible pour un public féminin. Un design soigné, un confort maîtrisé et une finition pensée pour durer.', 1, '{}');
INSERT INTO public."Product" VALUES (63, 'samba', 'og', 'cow print', '2025', 15900, 'bo2hrtdxu4npw7qwy86k4v4lwf79.webp', '{01-bo2hrtdxu4npw7qwy86k4v4lwf79.webp,02-l6352hdysczngdt8tw9ixrdbyt7p.webp,03-o4jrhaspuua3whhr0cwxtynnq88m.webp,04-dlfs9jvof3y7jijb70ctsm7it9o4.webp,05-785h0ka22yboi41r6m12pvbe9p2u.webp,06-fsawfekywq2qoh5iqap0oqn1j468.webp,07-fiymeadviyxkxafhazfv6yr4d3k8.webp}', NULL, 'WOMEN', 3, 'La Adidas Samba Og « Cow Print » 2025 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Disponible pour un public féminin. Un design soigné, un confort maîtrisé et une finition pensée pour durer.', 1, '{}');
INSERT INTO public."Product" VALUES (65, 'gazelle', 'indoor', 'Magic Beige', '2024', 9900, '6do8qmta49arkyh9nc2k6pnubf62.webp', '{01-6do8qmta49arkyh9nc2k6pnubf62.webp,02-5r02e6c4m0125ja3m86fjloi1lv9.webp,03-3pd73jesiluajtl0rojqlanvr5s5.webp,04-ck97puaw1pnkuuii7y3fc6efmoqv.webp,05-zs4ljom76ctl2kk1q8gvwi85aznh.webp,06-cs59w292jtsqqb8cnkj9ky1wfsu8.webp,07-gs9nf7i9fjlntiudu0dx5swwjyxe.webp}', NULL, 'WOMEN', 3, 'La Adidas Gazelle Indoor « Magic Beige » 2024 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Disponible pour un public féminin. Un design soigné, un confort maîtrisé et une finition pensée pour durer.', 1, '{}');
INSERT INTO public."Product" VALUES (66, 'sl 72', 'og', 'Leopard Print', '2025', 7900, 'k10dxddf3hio9345z69hn7hntekv.webp', '{01-k10dxddf3hio9345z69hn7hntekv.webp,02-qpeigxhwmwnuep4qhgpbhyev10m1.webp,03-94p1sb9zk4x6ezk3laoevjyyh6kj.webp,04-5h38vh63fc2f4l79wt7b2hiexvt5.webp,05-jysxyysm543feahzhrtgvbixrmlm.webp*,06-br7q29jt1mn6pvlbpadtdp9yk4qv.webp,07-qj90ww3yred72d2ko2lfp7dvn5dn.webp}', NULL, 'WOMEN', 5, 'La Adidas Sl 72 Og « Leopard Print » 2025 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Disponible pour un public féminin. Un design soigné, un confort maîtrisé et une finition pensée pour durer.', 1, '{}');
INSERT INTO public."Product" VALUES (68, 'samba', 'og', 'White Silver Metallic Grey', '2024', 7900, '4q9nv2mm64uatidogg6b5nt1n9v0.webp', '{01-4q9nv2mm64uatidogg6b5nt1n9v0.webp,02-0qc4hfdegs011t4y8bvayglnfcar.webp,03-e3np6ymj9l41681olsw9ekmjiqlp.webp,04-p3a7o2vc08a1e18p6idmtjd5x4ew.webp,05-ob7zobmg6fj3hljt342c45gyta1b.webp,06-baed6wbsocyo3pbqwcw9t48vupxr.webp,07-ilbhumrobs0owmk753mz5tvu2qq4.webp}', NULL, 'WOMEN', 3, 'La Adidas Samba Og « White Silver Metallic Grey » 2024 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Disponible pour un public féminin. Un design soigné, un confort maîtrisé et une finition pensée pour durer.', 1, '{}');
INSERT INTO public."Product" VALUES (70, 'air jordan', '3', 'Valentine''s Day Treat Yourself', '2025', 17900, 'vdwjq6a9yfw4mmt19zl9lfk8czrf.webp', '{01-vdwjq6a9yfw4mmt19zl9lfk8czrf.webp,02-553kmhqb198gx5zkxlxcixcjifbk.webp,03-hq5ms1ftm4kad0n2006l31vj0ctx.webp,04-8njkah765cmw5gfpxhds0wbr3u05.webp,05-4y8w5wld0wnn8ae80ih5dxs2wrz7.webp,06-eg3m9gdrr786vjjvqs1uogi07cql.webp,07-dxsyxrh82ugfim1zcrmueryewao0.webp,""}', NULL, 'WOMEN', 7, 'La Jordan Air Jordan 3 « Valentine''S Day Treat Yourself » 2025 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Disponible pour un public féminin. Un design soigné, un confort maîtrisé et une finition pensée pour durer.', 3, '{}');
INSERT INTO public."Product" VALUES (72, 'air jordan', '3', 'sail', '2025', 12900, 'tbg587ge48y00st234s3pbgkvtia.webp', '{01-tbg587ge48y00st234s3pbgkvtia.webp,02-jwauwd9765sivl9lw7t5qlbg6mm5.webp,03-s5ukgnq1tuhcq2pmwgh29l09dosi.webp,04-9eil656pxpz7zxike8lfgdb6kft3.webp,05-pyajxa0p2v0spkjff34h4j4l5g8a.webp,06-854cf4amityzy6dtjunbup5jvgee.webp,07-qk3judfdgnpuyetcb34lzz24j1ab.webp}', NULL, 'WOMEN', 3, 'La Jordan Air Jordan 3 « Sail » 2025 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Disponible pour un public féminin. Un design soigné, un confort maîtrisé et une finition pensée pour durer.', 3, '{}');
INSERT INTO public."Product" VALUES (73, 'air jordan', '4', 'orchid', '2024', 28900, 'rgh9wny2r0djpfc59d48n3g5nlsu.webp', '{01-rgh9wny2r0djpfc59d48n3g5nlsu.webp,02-itoaasjizmmd1ukqbzqefuv2sdf3.webp,03-n3vf5ekf6025ohls5d8yngaxix4y.webp,04-4132u7yl2w858e22v2n95bfzep5r.webp,05-bs57an7b4u3iawe8nxwqczga1bdj.webp,06-mch05m35cksip66q336n2g54f9t2.webp,07-y2p6e01i33u8copct9571gysso5b.webp}', NULL, 'WOMEN', 10, 'La Jordan Air Jordan 4 « Orchid » 2024 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Disponible pour un public féminin. Un design soigné, un confort maîtrisé et une finition pensée pour durer.', 3, '{}');
INSERT INTO public."Product" VALUES (74, 'air jordan', '4', 'aluminum', '2025', 17900, 'jg3vcu7wocs03s2s7ms01zewiyq7.webp', '{01-jg3vcu7wocs03s2s7ms01zewiyq7.webp,02-hyqraafvuuduefnvu3ihsbd6no9m.webp,03-pxo6xmnstvjyr69vmcyoqrbq0vky.webp,04-o8upkir5bo9wcq56z87a8uk4tbp2.webp,05-4kvgtdyiv4et0rv7meiro1ne1knr.webp,06-bli0ryzinyjimlzt78y7t310le01.webp,07-uqwx389hfx6ih2n6i8ipezuzisn2.webp}', NULL, 'WOMEN', 2, 'La Jordan Air Jordan 4 « Aluminum » 2025 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Disponible pour un public féminin. Un design soigné, un confort maîtrisé et une finition pensée pour durer.', 3, '{}');
INSERT INTO public."Product" VALUES (75, 'air jordan', '4', 'Frozen Moments', '2023', 34900, 'kgb00kubgm3l5lte12tzi7v0qep1.webp', '{01-kgb00kubgm3l5lte12tzi7v0qep1.webp,02-ybf9nwybz72r7j0ibhy21398rdmh.webp,03-9hdodnnxtjnar1c68cplxlpznjg5.webp,04-jgz80zju5r5cxjjf90zj1up8z3g6.webp,05-47rq8x8vvkl0bab2prqaf27hingx.webp,06-7dj0m0hrs1ih07f7zai3sq1znypt.webp,07-k8m8jcrzxbytrsohtk80m8ojvacv.webp}', NULL, 'WOMEN', 6, 'La Jordan Air Jordan 4 « Frozen Moments » 2023 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Disponible pour un public féminin. Un design soigné, un confort maîtrisé et une finition pensée pour durer.', 3, '{}');
INSERT INTO public."Product" VALUES (76, 'air jordan', '4', 'abundance', '2025', 16900, '0pbq0pvi8lnesoq1mgkk6y23zang.webp', '{01-0pbq0pvi8lnesoq1mgkk6y23zang.webp,02-ao1u0sk12jlzk8lrq8u1qlqsvulq.webp,03-m2lbq6e272f5ai9kd1717c981r6s.webp,04-yidz0n0wxivdkptihmag7wpqb8k5.webp,05-x5s0kz0iojslfluielku5rebaf17.webp,06-wzg4kw23i0wbr9ye2lsn4k9681fq.webp,07-ozuqk0d7gla38m2tdu64scus0kia.webp}', NULL, 'WOMEN', 8, 'La Jordan Air Jordan 4 « Abundance » 2025 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Disponible pour un public féminin. Un design soigné, un confort maîtrisé et une finition pensée pour durer.', 3, '{}');
INSERT INTO public."Product" VALUES (77, 'air jordan', '4', 'sail', '2024', 26900, 'zt7gqz17jm1vn5w6q92wx5od8cqd.webp', '{01-zt7gqz17jm1vn5w6q92wx5od8cqd.webp,02-xdi7hw0h2it8gk4pdfydg9e4k76a.webp,03-9sxd6c7xk1xj5iccnz9e9htwggrq.webp,04-8fooblivbategfoyaewgslfjflwd.webp,05-9dxrjn7aevqpaw3uos5xi0vrx5op.webp,06-bts4ag7rujvfer1iu1n1zm88ybdo.webp,07-yu14yy6jq85asvmjr834xsrgwon8.webp}', NULL, 'WOMEN', 3, 'La Jordan Air Jordan 4 « Sail » 2024 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Disponible pour un public féminin. Un design soigné, un confort maîtrisé et une finition pensée pour durer.', 3, '{}');
INSERT INTO public."Product" VALUES (84, 'dunk low', '', 'Rose Whisper', '2022', 5900, '8mwk9z7p819w7yoslfwc0sl7v3y0.webp', '{01-8mwk9z7p819w7yoslfwc0sl7v3y0.webp,02-rn6obddn9higt9o30y7fhzt4qwk1.webp,03-49gfe1xncizfniba8qts8pnsj268.webp,04-q6tdlmqgl5rxvyiwvfwozckiq0vj.webp,05-mdxc4j2r7i289znkgepkp6b9b1mz.webp,06-b9pp0yztze068f0xr3fxaprmtfhy.webp,07-zx0ngkcwr7dvsm7smdzj1auj4owx.webp}', NULL, 'WOMEN', 7, 'La Nike Dunk Low  « Rose Whisper » 2022 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Disponible pour un public féminin. Un design soigné, un confort maîtrisé et une finition pensée pour durer.', 4, '{}');
INSERT INTO public."Product" VALUES (87, 'zoom vomero', '5', 'Khaki Phantom', '2024', 9900, '045ehjd3iipx5ka8yxrxkx8jqfgs.webp', '{01-045ehjd3iipx5ka8yxrxkx8jqfgs.webp,02-bvuan90gnk186vy6a4wmqbu72pon.webp,03-420xe5m4o8dsrn9hxz3hb8jvxfrz.webp,04-q1vaju6y7cmv4ls2fx3iq4q7e9lp.webp,05-gt665ivkxzres4bmyivlg4bkq82b.webp,06-wv8rcuw1sx6l6wfqf09hbg19qrdg.webp,07-rz6yrlwseb8ctdlrm1b55fujg48k.webp}', NULL, 'WOMEN', 4, 'La Nike Zoom Vomero 5 « Khaki Phantom » 2024 revisite la silhouette iconique avec une association de matériaux premium et une finition soignée. La tige mêle cuir et textile pour un maintien rassurant et un look contemporain, tandis que la semelle intermédiaire assure un amorti réactif pour un confort toute la journée. Pensée autant pour le style que la performance, cette version se porte facilement au quotidien et apporte une touche collector à toute garde-robe. Disponible pour un public féminin. Un design soigné, un confort maîtrisé et une finition pensée pour durer.', 4, '{}');


--
-- TOC entry 3966 (class 0 OID 18038)
-- Dependencies: 237
-- Data for Name: ProductSize; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."ProductSize" VALUES (1, 49, 1, 8);
INSERT INTO public."ProductSize" VALUES (2, 49, 2, 5);
INSERT INTO public."ProductSize" VALUES (3, 49, 3, 0);
INSERT INTO public."ProductSize" VALUES (4, 49, 4, 12);
INSERT INTO public."ProductSize" VALUES (5, 49, 5, 7);
INSERT INTO public."ProductSize" VALUES (6, 49, 6, 3);
INSERT INTO public."ProductSize" VALUES (7, 49, 7, 0);
INSERT INTO public."ProductSize" VALUES (8, 49, 8, 9);
INSERT INTO public."ProductSize" VALUES (9, 49, 9, 6);
INSERT INTO public."ProductSize" VALUES (10, 49, 10, 11);
INSERT INTO public."ProductSize" VALUES (11, 49, 11, 2);
INSERT INTO public."ProductSize" VALUES (12, 49, 12, 8);
INSERT INTO public."ProductSize" VALUES (13, 49, 13, 0);
INSERT INTO public."ProductSize" VALUES (14, 49, 14, 5);
INSERT INTO public."ProductSize" VALUES (15, 49, 15, 10);
INSERT INTO public."ProductSize" VALUES (16, 49, 16, 1);
INSERT INTO public."ProductSize" VALUES (17, 49, 17, 7);
INSERT INTO public."ProductSize" VALUES (18, 49, 18, 0);
INSERT INTO public."ProductSize" VALUES (19, 49, 19, 4);
INSERT INTO public."ProductSize" VALUES (20, 49, 20, 6);
INSERT INTO public."ProductSize" VALUES (21, 50, 1, 0);
INSERT INTO public."ProductSize" VALUES (22, 50, 2, 9);
INSERT INTO public."ProductSize" VALUES (23, 50, 3, 12);
INSERT INTO public."ProductSize" VALUES (24, 50, 4, 3);
INSERT INTO public."ProductSize" VALUES (25, 50, 5, 0);
INSERT INTO public."ProductSize" VALUES (26, 50, 6, 8);
INSERT INTO public."ProductSize" VALUES (27, 50, 7, 5);
INSERT INTO public."ProductSize" VALUES (28, 50, 8, 0);
INSERT INTO public."ProductSize" VALUES (29, 50, 9, 11);
INSERT INTO public."ProductSize" VALUES (30, 50, 10, 7);
INSERT INTO public."ProductSize" VALUES (31, 50, 11, 2);
INSERT INTO public."ProductSize" VALUES (32, 50, 12, 0);
INSERT INTO public."ProductSize" VALUES (33, 50, 13, 6);
INSERT INTO public."ProductSize" VALUES (34, 50, 14, 10);
INSERT INTO public."ProductSize" VALUES (35, 50, 15, 4);
INSERT INTO public."ProductSize" VALUES (36, 50, 16, 0);
INSERT INTO public."ProductSize" VALUES (37, 50, 17, 9);
INSERT INTO public."ProductSize" VALUES (38, 50, 18, 13);
INSERT INTO public."ProductSize" VALUES (39, 50, 19, 1);
INSERT INTO public."ProductSize" VALUES (40, 50, 20, 8);
INSERT INTO public."ProductSize" VALUES (41, 51, 1, 5);
INSERT INTO public."ProductSize" VALUES (42, 51, 2, 0);
INSERT INTO public."ProductSize" VALUES (43, 51, 3, 7);
INSERT INTO public."ProductSize" VALUES (44, 51, 4, 11);
INSERT INTO public."ProductSize" VALUES (45, 51, 5, 3);
INSERT INTO public."ProductSize" VALUES (46, 51, 6, 0);
INSERT INTO public."ProductSize" VALUES (47, 51, 7, 9);
INSERT INTO public."ProductSize" VALUES (48, 51, 8, 6);
INSERT INTO public."ProductSize" VALUES (49, 51, 9, 0);
INSERT INTO public."ProductSize" VALUES (50, 51, 10, 12);
INSERT INTO public."ProductSize" VALUES (51, 51, 11, 8);
INSERT INTO public."ProductSize" VALUES (52, 51, 12, 2);
INSERT INTO public."ProductSize" VALUES (53, 51, 13, 0);
INSERT INTO public."ProductSize" VALUES (54, 51, 14, 10);
INSERT INTO public."ProductSize" VALUES (55, 51, 15, 5);
INSERT INTO public."ProductSize" VALUES (56, 51, 16, 0);
INSERT INTO public."ProductSize" VALUES (57, 51, 17, 7);
INSERT INTO public."ProductSize" VALUES (58, 51, 18, 4);
INSERT INTO public."ProductSize" VALUES (59, 51, 19, 11);
INSERT INTO public."ProductSize" VALUES (60, 51, 20, 0);
INSERT INTO public."ProductSize" VALUES (61, 52, 1, 10);
INSERT INTO public."ProductSize" VALUES (62, 52, 2, 6);
INSERT INTO public."ProductSize" VALUES (63, 52, 3, 0);
INSERT INTO public."ProductSize" VALUES (64, 52, 4, 8);
INSERT INTO public."ProductSize" VALUES (65, 52, 5, 13);
INSERT INTO public."ProductSize" VALUES (66, 52, 6, 1);
INSERT INTO public."ProductSize" VALUES (67, 52, 7, 0);
INSERT INTO public."ProductSize" VALUES (68, 52, 8, 11);
INSERT INTO public."ProductSize" VALUES (69, 52, 9, 4);
INSERT INTO public."ProductSize" VALUES (70, 52, 10, 0);
INSERT INTO public."ProductSize" VALUES (71, 52, 11, 9);
INSERT INTO public."ProductSize" VALUES (72, 52, 12, 7);
INSERT INTO public."ProductSize" VALUES (73, 52, 13, 2);
INSERT INTO public."ProductSize" VALUES (74, 52, 14, 0);
INSERT INTO public."ProductSize" VALUES (75, 52, 15, 12);
INSERT INTO public."ProductSize" VALUES (76, 52, 16, 5);
INSERT INTO public."ProductSize" VALUES (77, 52, 17, 0);
INSERT INTO public."ProductSize" VALUES (78, 52, 18, 8);
INSERT INTO public."ProductSize" VALUES (79, 52, 19, 3);
INSERT INTO public."ProductSize" VALUES (80, 52, 20, 10);
INSERT INTO public."ProductSize" VALUES (81, 53, 1, 0);
INSERT INTO public."ProductSize" VALUES (82, 53, 2, 7);
INSERT INTO public."ProductSize" VALUES (83, 53, 3, 11);
INSERT INTO public."ProductSize" VALUES (84, 53, 4, 0);
INSERT INTO public."ProductSize" VALUES (85, 53, 5, 5);
INSERT INTO public."ProductSize" VALUES (86, 53, 6, 9);
INSERT INTO public."ProductSize" VALUES (87, 53, 7, 2);
INSERT INTO public."ProductSize" VALUES (88, 53, 8, 0);
INSERT INTO public."ProductSize" VALUES (89, 53, 9, 13);
INSERT INTO public."ProductSize" VALUES (90, 53, 10, 6);
INSERT INTO public."ProductSize" VALUES (91, 53, 11, 0);
INSERT INTO public."ProductSize" VALUES (92, 53, 12, 10);
INSERT INTO public."ProductSize" VALUES (93, 53, 13, 4);
INSERT INTO public."ProductSize" VALUES (94, 53, 14, 8);
INSERT INTO public."ProductSize" VALUES (95, 53, 15, 0);
INSERT INTO public."ProductSize" VALUES (96, 53, 16, 12);
INSERT INTO public."ProductSize" VALUES (97, 53, 17, 3);
INSERT INTO public."ProductSize" VALUES (98, 53, 18, 0);
INSERT INTO public."ProductSize" VALUES (99, 53, 19, 7);
INSERT INTO public."ProductSize" VALUES (100, 53, 20, 9);
INSERT INTO public."ProductSize" VALUES (101, 54, 1, 6);
INSERT INTO public."ProductSize" VALUES (102, 54, 2, 0);
INSERT INTO public."ProductSize" VALUES (103, 54, 3, 9);
INSERT INTO public."ProductSize" VALUES (104, 54, 4, 12);
INSERT INTO public."ProductSize" VALUES (105, 54, 5, 2);
INSERT INTO public."ProductSize" VALUES (106, 54, 6, 0);
INSERT INTO public."ProductSize" VALUES (107, 54, 7, 8);
INSERT INTO public."ProductSize" VALUES (108, 54, 8, 5);
INSERT INTO public."ProductSize" VALUES (109, 54, 9, 0);
INSERT INTO public."ProductSize" VALUES (110, 54, 10, 11);
INSERT INTO public."ProductSize" VALUES (111, 54, 11, 7);
INSERT INTO public."ProductSize" VALUES (112, 54, 12, 0);
INSERT INTO public."ProductSize" VALUES (113, 54, 13, 10);
INSERT INTO public."ProductSize" VALUES (114, 54, 14, 3);
INSERT INTO public."ProductSize" VALUES (115, 54, 15, 0);
INSERT INTO public."ProductSize" VALUES (116, 54, 16, 13);
INSERT INTO public."ProductSize" VALUES (117, 54, 17, 6);
INSERT INTO public."ProductSize" VALUES (118, 54, 18, 9);
INSERT INTO public."ProductSize" VALUES (119, 54, 19, 0);
INSERT INTO public."ProductSize" VALUES (120, 54, 20, 4);
INSERT INTO public."ProductSize" VALUES (121, 55, 1, 0);
INSERT INTO public."ProductSize" VALUES (122, 55, 2, 11);
INSERT INTO public."ProductSize" VALUES (123, 55, 3, 5);
INSERT INTO public."ProductSize" VALUES (124, 55, 4, 0);
INSERT INTO public."ProductSize" VALUES (125, 55, 5, 8);
INSERT INTO public."ProductSize" VALUES (126, 55, 6, 12);
INSERT INTO public."ProductSize" VALUES (127, 55, 7, 3);
INSERT INTO public."ProductSize" VALUES (128, 55, 8, 0);
INSERT INTO public."ProductSize" VALUES (129, 55, 9, 7);
INSERT INTO public."ProductSize" VALUES (130, 55, 10, 10);
INSERT INTO public."ProductSize" VALUES (131, 55, 11, 0);
INSERT INTO public."ProductSize" VALUES (132, 55, 12, 9);
INSERT INTO public."ProductSize" VALUES (133, 55, 13, 6);
INSERT INTO public."ProductSize" VALUES (134, 55, 14, 0);
INSERT INTO public."ProductSize" VALUES (135, 55, 15, 13);
INSERT INTO public."ProductSize" VALUES (136, 55, 16, 4);
INSERT INTO public."ProductSize" VALUES (137, 55, 17, 0);
INSERT INTO public."ProductSize" VALUES (138, 55, 18, 11);
INSERT INTO public."ProductSize" VALUES (139, 55, 19, 2);
INSERT INTO public."ProductSize" VALUES (140, 55, 20, 8);
INSERT INTO public."ProductSize" VALUES (141, 56, 1, 9);
INSERT INTO public."ProductSize" VALUES (142, 56, 2, 0);
INSERT INTO public."ProductSize" VALUES (143, 56, 3, 6);
INSERT INTO public."ProductSize" VALUES (144, 56, 4, 11);
INSERT INTO public."ProductSize" VALUES (145, 56, 5, 0);
INSERT INTO public."ProductSize" VALUES (146, 56, 6, 7);
INSERT INTO public."ProductSize" VALUES (147, 56, 7, 13);
INSERT INTO public."ProductSize" VALUES (148, 56, 8, 2);
INSERT INTO public."ProductSize" VALUES (149, 56, 9, 0);
INSERT INTO public."ProductSize" VALUES (150, 56, 10, 10);
INSERT INTO public."ProductSize" VALUES (151, 56, 11, 5);
INSERT INTO public."ProductSize" VALUES (152, 56, 12, 0);
INSERT INTO public."ProductSize" VALUES (153, 56, 13, 8);
INSERT INTO public."ProductSize" VALUES (154, 56, 14, 12);
INSERT INTO public."ProductSize" VALUES (155, 56, 15, 3);
INSERT INTO public."ProductSize" VALUES (156, 56, 16, 0);
INSERT INTO public."ProductSize" VALUES (157, 56, 17, 9);
INSERT INTO public."ProductSize" VALUES (158, 56, 18, 4);
INSERT INTO public."ProductSize" VALUES (159, 56, 19, 0);
INSERT INTO public."ProductSize" VALUES (160, 56, 20, 7);
INSERT INTO public."ProductSize" VALUES (161, 57, 1, 0);
INSERT INTO public."ProductSize" VALUES (162, 57, 2, 8);
INSERT INTO public."ProductSize" VALUES (163, 57, 3, 12);
INSERT INTO public."ProductSize" VALUES (164, 57, 4, 4);
INSERT INTO public."ProductSize" VALUES (165, 57, 5, 0);
INSERT INTO public."ProductSize" VALUES (166, 57, 6, 10);
INSERT INTO public."ProductSize" VALUES (167, 57, 7, 6);
INSERT INTO public."ProductSize" VALUES (168, 57, 8, 0);
INSERT INTO public."ProductSize" VALUES (169, 57, 9, 11);
INSERT INTO public."ProductSize" VALUES (170, 57, 10, 3);
INSERT INTO public."ProductSize" VALUES (171, 57, 11, 0);
INSERT INTO public."ProductSize" VALUES (172, 57, 12, 9);
INSERT INTO public."ProductSize" VALUES (173, 57, 13, 7);
INSERT INTO public."ProductSize" VALUES (174, 57, 14, 0);
INSERT INTO public."ProductSize" VALUES (175, 57, 15, 13);
INSERT INTO public."ProductSize" VALUES (176, 57, 16, 5);
INSERT INTO public."ProductSize" VALUES (177, 57, 17, 0);
INSERT INTO public."ProductSize" VALUES (178, 57, 18, 10);
INSERT INTO public."ProductSize" VALUES (179, 57, 19, 2);
INSERT INTO public."ProductSize" VALUES (180, 57, 20, 8);
INSERT INTO public."ProductSize" VALUES (181, 58, 1, 7);
INSERT INTO public."ProductSize" VALUES (182, 58, 2, 0);
INSERT INTO public."ProductSize" VALUES (183, 58, 3, 11);
INSERT INTO public."ProductSize" VALUES (184, 58, 4, 5);
INSERT INTO public."ProductSize" VALUES (185, 58, 5, 0);
INSERT INTO public."ProductSize" VALUES (186, 58, 6, 9);
INSERT INTO public."ProductSize" VALUES (187, 58, 7, 13);
INSERT INTO public."ProductSize" VALUES (188, 58, 8, 1);
INSERT INTO public."ProductSize" VALUES (189, 58, 9, 0);
INSERT INTO public."ProductSize" VALUES (190, 58, 10, 12);
INSERT INTO public."ProductSize" VALUES (191, 58, 11, 6);
INSERT INTO public."ProductSize" VALUES (192, 58, 12, 0);
INSERT INTO public."ProductSize" VALUES (193, 58, 13, 10);
INSERT INTO public."ProductSize" VALUES (194, 58, 14, 4);
INSERT INTO public."ProductSize" VALUES (195, 58, 15, 0);
INSERT INTO public."ProductSize" VALUES (196, 58, 16, 8);
INSERT INTO public."ProductSize" VALUES (197, 58, 17, 11);
INSERT INTO public."ProductSize" VALUES (198, 58, 18, 0);
INSERT INTO public."ProductSize" VALUES (199, 58, 19, 3);
INSERT INTO public."ProductSize" VALUES (200, 58, 20, 9);
INSERT INTO public."ProductSize" VALUES (201, 59, 21, 0);
INSERT INTO public."ProductSize" VALUES (202, 59, 22, 8);
INSERT INTO public."ProductSize" VALUES (203, 59, 23, 12);
INSERT INTO public."ProductSize" VALUES (204, 59, 24, 3);
INSERT INTO public."ProductSize" VALUES (205, 59, 25, 0);
INSERT INTO public."ProductSize" VALUES (206, 59, 26, 9);
INSERT INTO public."ProductSize" VALUES (207, 59, 27, 6);
INSERT INTO public."ProductSize" VALUES (208, 59, 28, 0);
INSERT INTO public."ProductSize" VALUES (209, 59, 29, 11);
INSERT INTO public."ProductSize" VALUES (210, 59, 30, 5);
INSERT INTO public."ProductSize" VALUES (211, 59, 31, 0);
INSERT INTO public."ProductSize" VALUES (212, 59, 32, 10);
INSERT INTO public."ProductSize" VALUES (213, 59, 33, 7);
INSERT INTO public."ProductSize" VALUES (214, 59, 34, 2);
INSERT INTO public."ProductSize" VALUES (215, 59, 35, 0);
INSERT INTO public."ProductSize" VALUES (216, 59, 36, 13);
INSERT INTO public."ProductSize" VALUES (217, 59, 37, 4);
INSERT INTO public."ProductSize" VALUES (218, 60, 21, 9);
INSERT INTO public."ProductSize" VALUES (219, 60, 22, 0);
INSERT INTO public."ProductSize" VALUES (220, 60, 23, 6);
INSERT INTO public."ProductSize" VALUES (221, 60, 24, 11);
INSERT INTO public."ProductSize" VALUES (222, 60, 25, 2);
INSERT INTO public."ProductSize" VALUES (223, 60, 26, 0);
INSERT INTO public."ProductSize" VALUES (224, 60, 27, 8);
INSERT INTO public."ProductSize" VALUES (225, 60, 28, 13);
INSERT INTO public."ProductSize" VALUES (226, 60, 29, 0);
INSERT INTO public."ProductSize" VALUES (227, 60, 30, 7);
INSERT INTO public."ProductSize" VALUES (228, 60, 31, 10);
INSERT INTO public."ProductSize" VALUES (229, 60, 32, 0);
INSERT INTO public."ProductSize" VALUES (230, 60, 33, 5);
INSERT INTO public."ProductSize" VALUES (231, 60, 34, 12);
INSERT INTO public."ProductSize" VALUES (232, 60, 35, 3);
INSERT INTO public."ProductSize" VALUES (233, 60, 36, 0);
INSERT INTO public."ProductSize" VALUES (234, 60, 37, 9);
INSERT INTO public."ProductSize" VALUES (235, 61, 21, 0);
INSERT INTO public."ProductSize" VALUES (236, 61, 22, 11);
INSERT INTO public."ProductSize" VALUES (237, 61, 23, 5);
INSERT INTO public."ProductSize" VALUES (238, 61, 24, 0);
INSERT INTO public."ProductSize" VALUES (239, 61, 25, 8);
INSERT INTO public."ProductSize" VALUES (240, 61, 26, 12);
INSERT INTO public."ProductSize" VALUES (241, 61, 27, 3);
INSERT INTO public."ProductSize" VALUES (242, 61, 28, 0);
INSERT INTO public."ProductSize" VALUES (243, 61, 29, 10);
INSERT INTO public."ProductSize" VALUES (244, 61, 30, 6);
INSERT INTO public."ProductSize" VALUES (245, 61, 31, 0);
INSERT INTO public."ProductSize" VALUES (246, 61, 32, 9);
INSERT INTO public."ProductSize" VALUES (247, 61, 33, 13);
INSERT INTO public."ProductSize" VALUES (248, 61, 34, 0);
INSERT INTO public."ProductSize" VALUES (249, 61, 35, 7);
INSERT INTO public."ProductSize" VALUES (250, 61, 36, 4);
INSERT INTO public."ProductSize" VALUES (251, 61, 37, 11);
INSERT INTO public."ProductSize" VALUES (252, 62, 21, 6);
INSERT INTO public."ProductSize" VALUES (253, 62, 22, 0);
INSERT INTO public."ProductSize" VALUES (254, 62, 23, 9);
INSERT INTO public."ProductSize" VALUES (255, 62, 24, 12);
INSERT INTO public."ProductSize" VALUES (256, 62, 25, 0);
INSERT INTO public."ProductSize" VALUES (257, 62, 26, 7);
INSERT INTO public."ProductSize" VALUES (258, 62, 27, 11);
INSERT INTO public."ProductSize" VALUES (259, 62, 28, 2);
INSERT INTO public."ProductSize" VALUES (260, 62, 29, 0);
INSERT INTO public."ProductSize" VALUES (261, 62, 30, 10);
INSERT INTO public."ProductSize" VALUES (262, 62, 31, 5);
INSERT INTO public."ProductSize" VALUES (263, 62, 32, 0);
INSERT INTO public."ProductSize" VALUES (264, 62, 33, 8);
INSERT INTO public."ProductSize" VALUES (265, 62, 34, 13);
INSERT INTO public."ProductSize" VALUES (266, 62, 35, 0);
INSERT INTO public."ProductSize" VALUES (267, 62, 36, 6);
INSERT INTO public."ProductSize" VALUES (268, 62, 37, 9);
INSERT INTO public."ProductSize" VALUES (269, 63, 21, 0);
INSERT INTO public."ProductSize" VALUES (270, 63, 22, 8);
INSERT INTO public."ProductSize" VALUES (271, 63, 23, 11);
INSERT INTO public."ProductSize" VALUES (272, 63, 24, 4);
INSERT INTO public."ProductSize" VALUES (273, 63, 25, 0);
INSERT INTO public."ProductSize" VALUES (274, 63, 26, 10);
INSERT INTO public."ProductSize" VALUES (275, 63, 27, 7);
INSERT INTO public."ProductSize" VALUES (276, 63, 28, 0);
INSERT INTO public."ProductSize" VALUES (277, 63, 29, 12);
INSERT INTO public."ProductSize" VALUES (278, 63, 30, 3);
INSERT INTO public."ProductSize" VALUES (279, 63, 31, 0);
INSERT INTO public."ProductSize" VALUES (280, 63, 32, 9);
INSERT INTO public."ProductSize" VALUES (281, 63, 33, 6);
INSERT INTO public."ProductSize" VALUES (282, 63, 34, 0);
INSERT INTO public."ProductSize" VALUES (283, 63, 35, 13);
INSERT INTO public."ProductSize" VALUES (284, 63, 36, 5);
INSERT INTO public."ProductSize" VALUES (285, 63, 37, 0);
INSERT INTO public."ProductSize" VALUES (286, 64, 21, 10);
INSERT INTO public."ProductSize" VALUES (287, 64, 22, 0);
INSERT INTO public."ProductSize" VALUES (288, 64, 23, 7);
INSERT INTO public."ProductSize" VALUES (289, 64, 24, 12);
INSERT INTO public."ProductSize" VALUES (290, 64, 25, 2);
INSERT INTO public."ProductSize" VALUES (291, 64, 26, 0);
INSERT INTO public."ProductSize" VALUES (292, 64, 27, 9);
INSERT INTO public."ProductSize" VALUES (293, 64, 28, 5);
INSERT INTO public."ProductSize" VALUES (294, 64, 29, 0);
INSERT INTO public."ProductSize" VALUES (295, 64, 30, 11);
INSERT INTO public."ProductSize" VALUES (296, 64, 31, 6);
INSERT INTO public."ProductSize" VALUES (297, 64, 32, 0);
INSERT INTO public."ProductSize" VALUES (298, 64, 33, 13);
INSERT INTO public."ProductSize" VALUES (299, 64, 34, 4);
INSERT INTO public."ProductSize" VALUES (300, 64, 35, 0);
INSERT INTO public."ProductSize" VALUES (301, 64, 36, 8);
INSERT INTO public."ProductSize" VALUES (302, 64, 37, 10);
INSERT INTO public."ProductSize" VALUES (303, 65, 21, 0);
INSERT INTO public."ProductSize" VALUES (304, 65, 22, 9);
INSERT INTO public."ProductSize" VALUES (305, 65, 23, 13);
INSERT INTO public."ProductSize" VALUES (306, 65, 24, 0);
INSERT INTO public."ProductSize" VALUES (307, 65, 25, 6);
INSERT INTO public."ProductSize" VALUES (308, 65, 26, 11);
INSERT INTO public."ProductSize" VALUES (309, 65, 27, 3);
INSERT INTO public."ProductSize" VALUES (310, 65, 28, 0);
INSERT INTO public."ProductSize" VALUES (311, 65, 29, 8);
INSERT INTO public."ProductSize" VALUES (312, 65, 30, 12);
INSERT INTO public."ProductSize" VALUES (313, 65, 31, 0);
INSERT INTO public."ProductSize" VALUES (314, 65, 32, 7);
INSERT INTO public."ProductSize" VALUES (315, 65, 33, 10);
INSERT INTO public."ProductSize" VALUES (316, 65, 34, 0);
INSERT INTO public."ProductSize" VALUES (317, 65, 35, 5);
INSERT INTO public."ProductSize" VALUES (318, 65, 36, 13);
INSERT INTO public."ProductSize" VALUES (319, 65, 37, 2);
INSERT INTO public."ProductSize" VALUES (320, 66, 21, 8);
INSERT INTO public."ProductSize" VALUES (321, 66, 22, 0);
INSERT INTO public."ProductSize" VALUES (322, 66, 23, 11);
INSERT INTO public."ProductSize" VALUES (323, 66, 24, 5);
INSERT INTO public."ProductSize" VALUES (324, 66, 25, 0);
INSERT INTO public."ProductSize" VALUES (325, 66, 26, 9);
INSERT INTO public."ProductSize" VALUES (326, 66, 27, 13);
INSERT INTO public."ProductSize" VALUES (327, 66, 28, 2);
INSERT INTO public."ProductSize" VALUES (328, 66, 29, 0);
INSERT INTO public."ProductSize" VALUES (329, 66, 30, 10);
INSERT INTO public."ProductSize" VALUES (330, 66, 31, 7);
INSERT INTO public."ProductSize" VALUES (331, 66, 32, 0);
INSERT INTO public."ProductSize" VALUES (332, 66, 33, 12);
INSERT INTO public."ProductSize" VALUES (333, 66, 34, 4);
INSERT INTO public."ProductSize" VALUES (334, 66, 35, 0);
INSERT INTO public."ProductSize" VALUES (335, 66, 36, 9);
INSERT INTO public."ProductSize" VALUES (336, 66, 37, 6);
INSERT INTO public."ProductSize" VALUES (337, 67, 21, 0);
INSERT INTO public."ProductSize" VALUES (338, 67, 22, 11);
INSERT INTO public."ProductSize" VALUES (339, 67, 23, 6);
INSERT INTO public."ProductSize" VALUES (340, 67, 24, 0);
INSERT INTO public."ProductSize" VALUES (341, 67, 25, 8);
INSERT INTO public."ProductSize" VALUES (342, 67, 26, 13);
INSERT INTO public."ProductSize" VALUES (343, 67, 27, 3);
INSERT INTO public."ProductSize" VALUES (344, 67, 28, 0);
INSERT INTO public."ProductSize" VALUES (345, 67, 29, 10);
INSERT INTO public."ProductSize" VALUES (346, 67, 30, 5);
INSERT INTO public."ProductSize" VALUES (347, 67, 31, 0);
INSERT INTO public."ProductSize" VALUES (348, 67, 32, 12);
INSERT INTO public."ProductSize" VALUES (349, 67, 33, 7);
INSERT INTO public."ProductSize" VALUES (350, 67, 34, 0);
INSERT INTO public."ProductSize" VALUES (351, 67, 35, 9);
INSERT INTO public."ProductSize" VALUES (352, 67, 36, 4);
INSERT INTO public."ProductSize" VALUES (353, 67, 37, 11);
INSERT INTO public."ProductSize" VALUES (354, 68, 21, 7);
INSERT INTO public."ProductSize" VALUES (355, 68, 22, 0);
INSERT INTO public."ProductSize" VALUES (356, 68, 23, 10);
INSERT INTO public."ProductSize" VALUES (357, 68, 24, 13);
INSERT INTO public."ProductSize" VALUES (358, 68, 25, 0);
INSERT INTO public."ProductSize" VALUES (359, 68, 26, 6);
INSERT INTO public."ProductSize" VALUES (360, 68, 27, 12);
INSERT INTO public."ProductSize" VALUES (361, 68, 28, 2);
INSERT INTO public."ProductSize" VALUES (362, 68, 29, 0);
INSERT INTO public."ProductSize" VALUES (363, 68, 30, 9);
INSERT INTO public."ProductSize" VALUES (364, 68, 31, 5);
INSERT INTO public."ProductSize" VALUES (365, 68, 32, 0);
INSERT INTO public."ProductSize" VALUES (366, 68, 33, 11);
INSERT INTO public."ProductSize" VALUES (367, 68, 34, 8);
INSERT INTO public."ProductSize" VALUES (368, 68, 35, 0);
INSERT INTO public."ProductSize" VALUES (369, 68, 36, 7);
INSERT INTO public."ProductSize" VALUES (370, 68, 37, 13);
INSERT INTO public."ProductSize" VALUES (371, 69, 21, 0);
INSERT INTO public."ProductSize" VALUES (372, 69, 22, 9);
INSERT INTO public."ProductSize" VALUES (373, 69, 23, 12);
INSERT INTO public."ProductSize" VALUES (374, 69, 24, 4);
INSERT INTO public."ProductSize" VALUES (375, 69, 25, 0);
INSERT INTO public."ProductSize" VALUES (376, 69, 26, 11);
INSERT INTO public."ProductSize" VALUES (377, 69, 27, 6);
INSERT INTO public."ProductSize" VALUES (378, 69, 28, 0);
INSERT INTO public."ProductSize" VALUES (379, 69, 29, 13);
INSERT INTO public."ProductSize" VALUES (380, 69, 30, 3);
INSERT INTO public."ProductSize" VALUES (381, 69, 31, 0);
INSERT INTO public."ProductSize" VALUES (382, 69, 32, 10);
INSERT INTO public."ProductSize" VALUES (383, 69, 33, 7);
INSERT INTO public."ProductSize" VALUES (384, 69, 34, 0);
INSERT INTO public."ProductSize" VALUES (385, 69, 35, 12);
INSERT INTO public."ProductSize" VALUES (386, 69, 36, 5);
INSERT INTO public."ProductSize" VALUES (387, 69, 37, 0);
INSERT INTO public."ProductSize" VALUES (388, 70, 21, 11);
INSERT INTO public."ProductSize" VALUES (389, 70, 22, 0);
INSERT INTO public."ProductSize" VALUES (390, 70, 23, 8);
INSERT INTO public."ProductSize" VALUES (391, 70, 24, 13);
INSERT INTO public."ProductSize" VALUES (392, 70, 25, 2);
INSERT INTO public."ProductSize" VALUES (393, 70, 26, 0);
INSERT INTO public."ProductSize" VALUES (394, 70, 27, 10);
INSERT INTO public."ProductSize" VALUES (395, 70, 28, 6);
INSERT INTO public."ProductSize" VALUES (396, 70, 29, 0);
INSERT INTO public."ProductSize" VALUES (397, 70, 30, 12);
INSERT INTO public."ProductSize" VALUES (398, 70, 31, 5);
INSERT INTO public."ProductSize" VALUES (399, 70, 32, 0);
INSERT INTO public."ProductSize" VALUES (400, 70, 33, 9);
INSERT INTO public."ProductSize" VALUES (401, 70, 34, 13);
INSERT INTO public."ProductSize" VALUES (402, 70, 35, 0);
INSERT INTO public."ProductSize" VALUES (403, 70, 36, 7);
INSERT INTO public."ProductSize" VALUES (404, 70, 37, 11);
INSERT INTO public."ProductSize" VALUES (405, 71, 21, 0);
INSERT INTO public."ProductSize" VALUES (406, 71, 22, 10);
INSERT INTO public."ProductSize" VALUES (407, 71, 23, 5);
INSERT INTO public."ProductSize" VALUES (408, 71, 24, 0);
INSERT INTO public."ProductSize" VALUES (409, 71, 25, 8);
INSERT INTO public."ProductSize" VALUES (410, 71, 26, 12);
INSERT INTO public."ProductSize" VALUES (411, 71, 27, 3);
INSERT INTO public."ProductSize" VALUES (412, 71, 28, 0);
INSERT INTO public."ProductSize" VALUES (413, 71, 29, 11);
INSERT INTO public."ProductSize" VALUES (414, 71, 30, 6);
INSERT INTO public."ProductSize" VALUES (415, 71, 31, 0);
INSERT INTO public."ProductSize" VALUES (416, 71, 32, 9);
INSERT INTO public."ProductSize" VALUES (417, 71, 33, 13);
INSERT INTO public."ProductSize" VALUES (418, 71, 34, 0);
INSERT INTO public."ProductSize" VALUES (419, 71, 35, 7);
INSERT INTO public."ProductSize" VALUES (420, 71, 36, 12);
INSERT INTO public."ProductSize" VALUES (421, 71, 37, 4);
INSERT INTO public."ProductSize" VALUES (422, 72, 21, 9);
INSERT INTO public."ProductSize" VALUES (423, 72, 22, 0);
INSERT INTO public."ProductSize" VALUES (424, 72, 23, 12);
INSERT INTO public."ProductSize" VALUES (425, 72, 24, 6);
INSERT INTO public."ProductSize" VALUES (426, 72, 25, 0);
INSERT INTO public."ProductSize" VALUES (427, 72, 26, 10);
INSERT INTO public."ProductSize" VALUES (428, 72, 27, 13);
INSERT INTO public."ProductSize" VALUES (429, 72, 28, 2);
INSERT INTO public."ProductSize" VALUES (430, 72, 29, 0);
INSERT INTO public."ProductSize" VALUES (431, 72, 30, 8);
INSERT INTO public."ProductSize" VALUES (432, 72, 31, 11);
INSERT INTO public."ProductSize" VALUES (433, 72, 32, 0);
INSERT INTO public."ProductSize" VALUES (434, 72, 33, 7);
INSERT INTO public."ProductSize" VALUES (435, 72, 34, 12);
INSERT INTO public."ProductSize" VALUES (436, 72, 35, 0);
INSERT INTO public."ProductSize" VALUES (437, 72, 36, 5);
INSERT INTO public."ProductSize" VALUES (438, 72, 37, 9);
INSERT INTO public."ProductSize" VALUES (439, 73, 21, 0);
INSERT INTO public."ProductSize" VALUES (440, 73, 22, 11);
INSERT INTO public."ProductSize" VALUES (441, 73, 23, 7);
INSERT INTO public."ProductSize" VALUES (442, 73, 24, 0);
INSERT INTO public."ProductSize" VALUES (443, 73, 25, 9);
INSERT INTO public."ProductSize" VALUES (444, 73, 26, 13);
INSERT INTO public."ProductSize" VALUES (445, 73, 27, 4);
INSERT INTO public."ProductSize" VALUES (446, 73, 28, 0);
INSERT INTO public."ProductSize" VALUES (447, 73, 29, 12);
INSERT INTO public."ProductSize" VALUES (448, 73, 30, 6);
INSERT INTO public."ProductSize" VALUES (449, 73, 31, 0);
INSERT INTO public."ProductSize" VALUES (450, 73, 32, 10);
INSERT INTO public."ProductSize" VALUES (451, 73, 33, 8);
INSERT INTO public."ProductSize" VALUES (452, 73, 34, 0);
INSERT INTO public."ProductSize" VALUES (453, 73, 35, 13);
INSERT INTO public."ProductSize" VALUES (454, 73, 36, 3);
INSERT INTO public."ProductSize" VALUES (455, 73, 37, 11);
INSERT INTO public."ProductSize" VALUES (456, 74, 21, 8);
INSERT INTO public."ProductSize" VALUES (457, 74, 22, 0);
INSERT INTO public."ProductSize" VALUES (458, 74, 23, 10);
INSERT INTO public."ProductSize" VALUES (459, 74, 24, 13);
INSERT INTO public."ProductSize" VALUES (460, 74, 25, 0);
INSERT INTO public."ProductSize" VALUES (461, 74, 26, 7);
INSERT INTO public."ProductSize" VALUES (462, 74, 27, 12);
INSERT INTO public."ProductSize" VALUES (463, 74, 28, 3);
INSERT INTO public."ProductSize" VALUES (464, 74, 29, 0);
INSERT INTO public."ProductSize" VALUES (465, 74, 30, 11);
INSERT INTO public."ProductSize" VALUES (466, 74, 31, 5);
INSERT INTO public."ProductSize" VALUES (467, 74, 32, 0);
INSERT INTO public."ProductSize" VALUES (468, 74, 33, 9);
INSERT INTO public."ProductSize" VALUES (469, 74, 34, 13);
INSERT INTO public."ProductSize" VALUES (470, 74, 35, 0);
INSERT INTO public."ProductSize" VALUES (471, 74, 36, 6);
INSERT INTO public."ProductSize" VALUES (472, 74, 37, 10);
INSERT INTO public."ProductSize" VALUES (473, 75, 21, 0);
INSERT INTO public."ProductSize" VALUES (474, 75, 22, 12);
INSERT INTO public."ProductSize" VALUES (475, 75, 23, 6);
INSERT INTO public."ProductSize" VALUES (476, 75, 24, 0);
INSERT INTO public."ProductSize" VALUES (477, 75, 25, 10);
INSERT INTO public."ProductSize" VALUES (478, 75, 26, 13);
INSERT INTO public."ProductSize" VALUES (479, 75, 27, 2);
INSERT INTO public."ProductSize" VALUES (480, 75, 28, 0);
INSERT INTO public."ProductSize" VALUES (481, 75, 29, 9);
INSERT INTO public."ProductSize" VALUES (482, 75, 30, 7);
INSERT INTO public."ProductSize" VALUES (483, 75, 31, 0);
INSERT INTO public."ProductSize" VALUES (484, 75, 32, 11);
INSERT INTO public."ProductSize" VALUES (485, 75, 33, 5);
INSERT INTO public."ProductSize" VALUES (486, 75, 34, 0);
INSERT INTO public."ProductSize" VALUES (487, 75, 35, 12);
INSERT INTO public."ProductSize" VALUES (488, 75, 36, 8);
INSERT INTO public."ProductSize" VALUES (489, 75, 37, 0);
INSERT INTO public."ProductSize" VALUES (490, 76, 21, 11);
INSERT INTO public."ProductSize" VALUES (491, 76, 22, 0);
INSERT INTO public."ProductSize" VALUES (492, 76, 23, 9);
INSERT INTO public."ProductSize" VALUES (493, 76, 24, 13);
INSERT INTO public."ProductSize" VALUES (494, 76, 25, 3);
INSERT INTO public."ProductSize" VALUES (495, 76, 26, 0);
INSERT INTO public."ProductSize" VALUES (496, 76, 27, 10);
INSERT INTO public."ProductSize" VALUES (497, 76, 28, 7);
INSERT INTO public."ProductSize" VALUES (498, 76, 29, 0);
INSERT INTO public."ProductSize" VALUES (499, 76, 30, 12);
INSERT INTO public."ProductSize" VALUES (500, 76, 31, 6);
INSERT INTO public."ProductSize" VALUES (501, 76, 32, 0);
INSERT INTO public."ProductSize" VALUES (502, 76, 33, 11);
INSERT INTO public."ProductSize" VALUES (503, 76, 34, 13);
INSERT INTO public."ProductSize" VALUES (504, 76, 35, 0);
INSERT INTO public."ProductSize" VALUES (505, 76, 36, 8);
INSERT INTO public."ProductSize" VALUES (506, 76, 37, 5);
INSERT INTO public."ProductSize" VALUES (507, 77, 21, 0);
INSERT INTO public."ProductSize" VALUES (508, 77, 22, 10);
INSERT INTO public."ProductSize" VALUES (509, 77, 23, 13);
INSERT INTO public."ProductSize" VALUES (510, 77, 24, 0);
INSERT INTO public."ProductSize" VALUES (511, 77, 25, 7);
INSERT INTO public."ProductSize" VALUES (512, 77, 26, 12);
INSERT INTO public."ProductSize" VALUES (513, 77, 27, 4);
INSERT INTO public."ProductSize" VALUES (514, 77, 28, 0);
INSERT INTO public."ProductSize" VALUES (515, 77, 29, 11);
INSERT INTO public."ProductSize" VALUES (516, 77, 30, 6);
INSERT INTO public."ProductSize" VALUES (517, 77, 31, 0);
INSERT INTO public."ProductSize" VALUES (518, 77, 32, 9);
INSERT INTO public."ProductSize" VALUES (519, 77, 33, 13);
INSERT INTO public."ProductSize" VALUES (520, 77, 34, 0);
INSERT INTO public."ProductSize" VALUES (521, 77, 35, 8);
INSERT INTO public."ProductSize" VALUES (522, 77, 36, 12);
INSERT INTO public."ProductSize" VALUES (523, 77, 37, 3);
INSERT INTO public."ProductSize" VALUES (524, 78, 21, 9);
INSERT INTO public."ProductSize" VALUES (525, 78, 22, 0);
INSERT INTO public."ProductSize" VALUES (526, 78, 23, 11);
INSERT INTO public."ProductSize" VALUES (527, 78, 24, 6);
INSERT INTO public."ProductSize" VALUES (528, 78, 25, 0);
INSERT INTO public."ProductSize" VALUES (529, 78, 26, 13);
INSERT INTO public."ProductSize" VALUES (530, 78, 27, 8);
INSERT INTO public."ProductSize" VALUES (531, 78, 28, 0);
INSERT INTO public."ProductSize" VALUES (532, 78, 29, 12);
INSERT INTO public."ProductSize" VALUES (533, 78, 30, 5);
INSERT INTO public."ProductSize" VALUES (534, 78, 31, 0);
INSERT INTO public."ProductSize" VALUES (535, 78, 32, 10);
INSERT INTO public."ProductSize" VALUES (536, 78, 33, 7);
INSERT INTO public."ProductSize" VALUES (537, 78, 34, 0);
INSERT INTO public."ProductSize" VALUES (538, 78, 35, 13);
INSERT INTO public."ProductSize" VALUES (539, 78, 36, 4);
INSERT INTO public."ProductSize" VALUES (540, 78, 37, 11);
INSERT INTO public."ProductSize" VALUES (541, 79, 21, 0);
INSERT INTO public."ProductSize" VALUES (542, 79, 22, 12);
INSERT INTO public."ProductSize" VALUES (543, 79, 23, 7);
INSERT INTO public."ProductSize" VALUES (544, 79, 24, 0);
INSERT INTO public."ProductSize" VALUES (545, 79, 25, 10);
INSERT INTO public."ProductSize" VALUES (546, 79, 26, 13);
INSERT INTO public."ProductSize" VALUES (547, 79, 27, 3);
INSERT INTO public."ProductSize" VALUES (548, 79, 28, 0);
INSERT INTO public."ProductSize" VALUES (549, 79, 29, 9);
INSERT INTO public."ProductSize" VALUES (550, 79, 30, 11);
INSERT INTO public."ProductSize" VALUES (551, 79, 31, 0);
INSERT INTO public."ProductSize" VALUES (552, 79, 32, 8);
INSERT INTO public."ProductSize" VALUES (553, 79, 33, 13);
INSERT INTO public."ProductSize" VALUES (554, 79, 34, 0);
INSERT INTO public."ProductSize" VALUES (555, 79, 35, 6);
INSERT INTO public."ProductSize" VALUES (556, 79, 36, 12);
INSERT INTO public."ProductSize" VALUES (557, 79, 37, 5);
INSERT INTO public."ProductSize" VALUES (558, 80, 21, 10);
INSERT INTO public."ProductSize" VALUES (559, 80, 22, 0);
INSERT INTO public."ProductSize" VALUES (560, 80, 23, 13);
INSERT INTO public."ProductSize" VALUES (561, 80, 24, 6);
INSERT INTO public."ProductSize" VALUES (562, 80, 25, 0);
INSERT INTO public."ProductSize" VALUES (563, 80, 26, 11);
INSERT INTO public."ProductSize" VALUES (564, 80, 27, 8);
INSERT INTO public."ProductSize" VALUES (565, 80, 28, 0);
INSERT INTO public."ProductSize" VALUES (566, 80, 29, 12);
INSERT INTO public."ProductSize" VALUES (567, 80, 30, 4);
INSERT INTO public."ProductSize" VALUES (568, 80, 31, 0);
INSERT INTO public."ProductSize" VALUES (569, 80, 32, 9);
INSERT INTO public."ProductSize" VALUES (570, 80, 33, 13);
INSERT INTO public."ProductSize" VALUES (571, 80, 34, 0);
INSERT INTO public."ProductSize" VALUES (572, 80, 35, 7);
INSERT INTO public."ProductSize" VALUES (573, 80, 36, 11);
INSERT INTO public."ProductSize" VALUES (574, 80, 37, 0);
INSERT INTO public."ProductSize" VALUES (575, 81, 21, 0);
INSERT INTO public."ProductSize" VALUES (576, 81, 22, 11);
INSERT INTO public."ProductSize" VALUES (577, 81, 23, 5);
INSERT INTO public."ProductSize" VALUES (578, 81, 24, 0);
INSERT INTO public."ProductSize" VALUES (579, 81, 25, 9);
INSERT INTO public."ProductSize" VALUES (580, 81, 26, 13);
INSERT INTO public."ProductSize" VALUES (581, 81, 27, 2);
INSERT INTO public."ProductSize" VALUES (582, 81, 28, 0);
INSERT INTO public."ProductSize" VALUES (583, 81, 29, 12);
INSERT INTO public."ProductSize" VALUES (584, 81, 30, 7);
INSERT INTO public."ProductSize" VALUES (585, 81, 31, 0);
INSERT INTO public."ProductSize" VALUES (586, 81, 32, 10);
INSERT INTO public."ProductSize" VALUES (587, 81, 33, 6);
INSERT INTO public."ProductSize" VALUES (588, 81, 34, 0);
INSERT INTO public."ProductSize" VALUES (589, 81, 35, 13);
INSERT INTO public."ProductSize" VALUES (590, 81, 36, 8);
INSERT INTO public."ProductSize" VALUES (591, 81, 37, 11);
INSERT INTO public."ProductSize" VALUES (592, 82, 21, 12);
INSERT INTO public."ProductSize" VALUES (593, 82, 22, 0);
INSERT INTO public."ProductSize" VALUES (594, 82, 23, 9);
INSERT INTO public."ProductSize" VALUES (595, 82, 24, 13);
INSERT INTO public."ProductSize" VALUES (596, 82, 25, 0);
INSERT INTO public."ProductSize" VALUES (597, 82, 26, 7);
INSERT INTO public."ProductSize" VALUES (598, 82, 27, 11);
INSERT INTO public."ProductSize" VALUES (599, 82, 28, 3);
INSERT INTO public."ProductSize" VALUES (600, 82, 29, 0);
INSERT INTO public."ProductSize" VALUES (601, 82, 30, 10);
INSERT INTO public."ProductSize" VALUES (602, 82, 31, 6);
INSERT INTO public."ProductSize" VALUES (603, 82, 32, 0);
INSERT INTO public."ProductSize" VALUES (604, 82, 33, 12);
INSERT INTO public."ProductSize" VALUES (605, 82, 34, 13);
INSERT INTO public."ProductSize" VALUES (606, 82, 35, 0);
INSERT INTO public."ProductSize" VALUES (607, 82, 36, 8);
INSERT INTO public."ProductSize" VALUES (608, 82, 37, 5);
INSERT INTO public."ProductSize" VALUES (609, 83, 21, 0);
INSERT INTO public."ProductSize" VALUES (610, 83, 22, 10);
INSERT INTO public."ProductSize" VALUES (611, 83, 23, 13);
INSERT INTO public."ProductSize" VALUES (612, 83, 24, 0);
INSERT INTO public."ProductSize" VALUES (613, 83, 25, 8);
INSERT INTO public."ProductSize" VALUES (614, 83, 26, 12);
INSERT INTO public."ProductSize" VALUES (615, 83, 27, 5);
INSERT INTO public."ProductSize" VALUES (616, 83, 28, 0);
INSERT INTO public."ProductSize" VALUES (617, 83, 29, 11);
INSERT INTO public."ProductSize" VALUES (618, 83, 30, 7);
INSERT INTO public."ProductSize" VALUES (619, 83, 31, 0);
INSERT INTO public."ProductSize" VALUES (620, 83, 32, 13);
INSERT INTO public."ProductSize" VALUES (621, 83, 33, 9);
INSERT INTO public."ProductSize" VALUES (622, 83, 34, 0);
INSERT INTO public."ProductSize" VALUES (623, 83, 35, 12);
INSERT INTO public."ProductSize" VALUES (624, 83, 36, 6);
INSERT INTO public."ProductSize" VALUES (625, 83, 37, 0);
INSERT INTO public."ProductSize" VALUES (626, 84, 21, 11);
INSERT INTO public."ProductSize" VALUES (627, 84, 22, 0);
INSERT INTO public."ProductSize" VALUES (628, 84, 23, 8);
INSERT INTO public."ProductSize" VALUES (629, 84, 24, 13);
INSERT INTO public."ProductSize" VALUES (630, 84, 25, 0);
INSERT INTO public."ProductSize" VALUES (631, 84, 26, 10);
INSERT INTO public."ProductSize" VALUES (632, 84, 27, 6);
INSERT INTO public."ProductSize" VALUES (633, 84, 28, 0);
INSERT INTO public."ProductSize" VALUES (634, 84, 29, 12);
INSERT INTO public."ProductSize" VALUES (635, 84, 30, 5);
INSERT INTO public."ProductSize" VALUES (636, 84, 31, 0);
INSERT INTO public."ProductSize" VALUES (637, 84, 32, 11);
INSERT INTO public."ProductSize" VALUES (638, 84, 33, 13);
INSERT INTO public."ProductSize" VALUES (639, 84, 34, 0);
INSERT INTO public."ProductSize" VALUES (640, 84, 35, 7);
INSERT INTO public."ProductSize" VALUES (641, 84, 36, 12);
INSERT INTO public."ProductSize" VALUES (642, 84, 37, 4);
INSERT INTO public."ProductSize" VALUES (643, 85, 21, 0);
INSERT INTO public."ProductSize" VALUES (644, 85, 22, 9);
INSERT INTO public."ProductSize" VALUES (645, 85, 23, 12);
INSERT INTO public."ProductSize" VALUES (646, 85, 24, 0);
INSERT INTO public."ProductSize" VALUES (647, 85, 25, 7);
INSERT INTO public."ProductSize" VALUES (648, 85, 26, 13);
INSERT INTO public."ProductSize" VALUES (649, 85, 27, 4);
INSERT INTO public."ProductSize" VALUES (650, 85, 28, 0);
INSERT INTO public."ProductSize" VALUES (651, 85, 29, 11);
INSERT INTO public."ProductSize" VALUES (652, 85, 30, 6);
INSERT INTO public."ProductSize" VALUES (653, 85, 31, 0);
INSERT INTO public."ProductSize" VALUES (654, 85, 32, 10);
INSERT INTO public."ProductSize" VALUES (655, 85, 33, 13);
INSERT INTO public."ProductSize" VALUES (656, 85, 34, 0);
INSERT INTO public."ProductSize" VALUES (657, 85, 35, 8);
INSERT INTO public."ProductSize" VALUES (658, 85, 36, 12);
INSERT INTO public."ProductSize" VALUES (659, 85, 37, 3);
INSERT INTO public."ProductSize" VALUES (660, 86, 21, 10);
INSERT INTO public."ProductSize" VALUES (661, 86, 22, 0);
INSERT INTO public."ProductSize" VALUES (662, 86, 23, 11);
INSERT INTO public."ProductSize" VALUES (663, 86, 24, 7);
INSERT INTO public."ProductSize" VALUES (664, 86, 25, 0);
INSERT INTO public."ProductSize" VALUES (665, 86, 26, 13);
INSERT INTO public."ProductSize" VALUES (666, 86, 27, 6);
INSERT INTO public."ProductSize" VALUES (667, 86, 28, 0);
INSERT INTO public."ProductSize" VALUES (668, 86, 29, 12);
INSERT INTO public."ProductSize" VALUES (669, 86, 30, 5);
INSERT INTO public."ProductSize" VALUES (670, 86, 31, 0);
INSERT INTO public."ProductSize" VALUES (671, 86, 32, 9);
INSERT INTO public."ProductSize" VALUES (672, 86, 33, 13);
INSERT INTO public."ProductSize" VALUES (673, 86, 34, 0);
INSERT INTO public."ProductSize" VALUES (674, 86, 35, 11);
INSERT INTO public."ProductSize" VALUES (675, 86, 36, 8);
INSERT INTO public."ProductSize" VALUES (676, 86, 37, 0);
INSERT INTO public."ProductSize" VALUES (677, 87, 21, 0);
INSERT INTO public."ProductSize" VALUES (678, 87, 22, 12);
INSERT INTO public."ProductSize" VALUES (679, 87, 23, 6);
INSERT INTO public."ProductSize" VALUES (680, 87, 24, 0);
INSERT INTO public."ProductSize" VALUES (681, 87, 25, 10);
INSERT INTO public."ProductSize" VALUES (682, 87, 26, 13);
INSERT INTO public."ProductSize" VALUES (683, 87, 27, 3);
INSERT INTO public."ProductSize" VALUES (684, 87, 28, 0);
INSERT INTO public."ProductSize" VALUES (685, 87, 29, 11);
INSERT INTO public."ProductSize" VALUES (686, 87, 30, 8);
INSERT INTO public."ProductSize" VALUES (687, 87, 31, 0);
INSERT INTO public."ProductSize" VALUES (688, 87, 32, 12);
INSERT INTO public."ProductSize" VALUES (689, 87, 33, 7);
INSERT INTO public."ProductSize" VALUES (690, 87, 34, 0);
INSERT INTO public."ProductSize" VALUES (691, 87, 35, 13);
INSERT INTO public."ProductSize" VALUES (692, 87, 36, 9);
INSERT INTO public."ProductSize" VALUES (693, 87, 37, 5);
INSERT INTO public."ProductSize" VALUES (694, 88, 21, 11);
INSERT INTO public."ProductSize" VALUES (695, 88, 22, 0);
INSERT INTO public."ProductSize" VALUES (696, 88, 23, 13);
INSERT INTO public."ProductSize" VALUES (697, 88, 24, 6);
INSERT INTO public."ProductSize" VALUES (698, 88, 25, 0);
INSERT INTO public."ProductSize" VALUES (699, 88, 26, 9);
INSERT INTO public."ProductSize" VALUES (700, 88, 27, 12);
INSERT INTO public."ProductSize" VALUES (701, 88, 28, 0);
INSERT INTO public."ProductSize" VALUES (702, 88, 29, 10);
INSERT INTO public."ProductSize" VALUES (703, 88, 30, 7);
INSERT INTO public."ProductSize" VALUES (704, 88, 31, 0);
INSERT INTO public."ProductSize" VALUES (705, 88, 32, 13);
INSERT INTO public."ProductSize" VALUES (706, 88, 33, 8);
INSERT INTO public."ProductSize" VALUES (707, 88, 34, 0);
INSERT INTO public."ProductSize" VALUES (708, 88, 35, 11);
INSERT INTO public."ProductSize" VALUES (709, 88, 36, 5);
INSERT INTO public."ProductSize" VALUES (710, 88, 37, 0);
INSERT INTO public."ProductSize" VALUES (711, 89, 21, 0);
INSERT INTO public."ProductSize" VALUES (712, 89, 22, 10);
INSERT INTO public."ProductSize" VALUES (713, 89, 23, 13);
INSERT INTO public."ProductSize" VALUES (714, 89, 24, 0);
INSERT INTO public."ProductSize" VALUES (715, 89, 25, 8);
INSERT INTO public."ProductSize" VALUES (716, 89, 26, 12);
INSERT INTO public."ProductSize" VALUES (717, 89, 27, 5);
INSERT INTO public."ProductSize" VALUES (718, 89, 28, 0);
INSERT INTO public."ProductSize" VALUES (719, 89, 29, 11);
INSERT INTO public."ProductSize" VALUES (720, 89, 30, 7);
INSERT INTO public."ProductSize" VALUES (721, 89, 31, 0);
INSERT INTO public."ProductSize" VALUES (722, 89, 32, 13);
INSERT INTO public."ProductSize" VALUES (723, 89, 33, 9);
INSERT INTO public."ProductSize" VALUES (724, 89, 34, 0);
INSERT INTO public."ProductSize" VALUES (725, 89, 35, 12);
INSERT INTO public."ProductSize" VALUES (726, 89, 36, 6);
INSERT INTO public."ProductSize" VALUES (727, 89, 37, 11);
INSERT INTO public."ProductSize" VALUES (728, 90, 21, 12);
INSERT INTO public."ProductSize" VALUES (729, 90, 22, 0);
INSERT INTO public."ProductSize" VALUES (730, 90, 23, 9);
INSERT INTO public."ProductSize" VALUES (731, 90, 24, 13);
INSERT INTO public."ProductSize" VALUES (732, 90, 25, 0);
INSERT INTO public."ProductSize" VALUES (733, 90, 26, 7);
INSERT INTO public."ProductSize" VALUES (734, 90, 27, 11);
INSERT INTO public."ProductSize" VALUES (735, 90, 28, 4);
INSERT INTO public."ProductSize" VALUES (736, 90, 29, 0);
INSERT INTO public."ProductSize" VALUES (737, 90, 30, 12);
INSERT INTO public."ProductSize" VALUES (738, 90, 31, 6);
INSERT INTO public."ProductSize" VALUES (739, 90, 32, 0);
INSERT INTO public."ProductSize" VALUES (740, 90, 33, 13);
INSERT INTO public."ProductSize" VALUES (741, 90, 34, 10);
INSERT INTO public."ProductSize" VALUES (742, 90, 35, 0);
INSERT INTO public."ProductSize" VALUES (743, 90, 36, 8);
INSERT INTO public."ProductSize" VALUES (744, 90, 37, 12);
INSERT INTO public."ProductSize" VALUES (745, 91, 21, 0);
INSERT INTO public."ProductSize" VALUES (746, 91, 22, 11);
INSERT INTO public."ProductSize" VALUES (747, 91, 23, 7);
INSERT INTO public."ProductSize" VALUES (748, 91, 24, 0);
INSERT INTO public."ProductSize" VALUES (749, 91, 25, 10);
INSERT INTO public."ProductSize" VALUES (750, 91, 26, 13);
INSERT INTO public."ProductSize" VALUES (751, 91, 27, 5);
INSERT INTO public."ProductSize" VALUES (752, 91, 28, 0);
INSERT INTO public."ProductSize" VALUES (753, 91, 29, 12);
INSERT INTO public."ProductSize" VALUES (754, 91, 30, 8);
INSERT INTO public."ProductSize" VALUES (755, 91, 31, 0);
INSERT INTO public."ProductSize" VALUES (756, 91, 32, 11);
INSERT INTO public."ProductSize" VALUES (757, 91, 33, 13);
INSERT INTO public."ProductSize" VALUES (758, 91, 34, 0);
INSERT INTO public."ProductSize" VALUES (759, 91, 35, 9);
INSERT INTO public."ProductSize" VALUES (760, 91, 36, 7);
INSERT INTO public."ProductSize" VALUES (761, 91, 37, 0);
INSERT INTO public."ProductSize" VALUES (762, 92, 21, 10);
INSERT INTO public."ProductSize" VALUES (763, 92, 22, 0);
INSERT INTO public."ProductSize" VALUES (764, 92, 23, 12);
INSERT INTO public."ProductSize" VALUES (765, 92, 24, 6);
INSERT INTO public."ProductSize" VALUES (766, 92, 25, 0);
INSERT INTO public."ProductSize" VALUES (767, 92, 26, 13);
INSERT INTO public."ProductSize" VALUES (768, 92, 27, 8);
INSERT INTO public."ProductSize" VALUES (769, 92, 28, 0);
INSERT INTO public."ProductSize" VALUES (770, 92, 29, 11);
INSERT INTO public."ProductSize" VALUES (771, 92, 30, 5);
INSERT INTO public."ProductSize" VALUES (772, 92, 31, 0);
INSERT INTO public."ProductSize" VALUES (773, 92, 32, 12);
INSERT INTO public."ProductSize" VALUES (774, 92, 33, 9);
INSERT INTO public."ProductSize" VALUES (775, 92, 34, 0);
INSERT INTO public."ProductSize" VALUES (776, 92, 35, 13);
INSERT INTO public."ProductSize" VALUES (777, 92, 36, 7);
INSERT INTO public."ProductSize" VALUES (778, 92, 37, 11);
INSERT INTO public."ProductSize" VALUES (779, 93, 21, 0);
INSERT INTO public."ProductSize" VALUES (780, 93, 22, 13);
INSERT INTO public."ProductSize" VALUES (781, 93, 23, 8);
INSERT INTO public."ProductSize" VALUES (782, 93, 24, 0);
INSERT INTO public."ProductSize" VALUES (783, 93, 25, 11);
INSERT INTO public."ProductSize" VALUES (784, 93, 26, 12);
INSERT INTO public."ProductSize" VALUES (785, 93, 27, 4);
INSERT INTO public."ProductSize" VALUES (786, 93, 28, 0);
INSERT INTO public."ProductSize" VALUES (787, 93, 29, 10);
INSERT INTO public."ProductSize" VALUES (788, 93, 30, 7);
INSERT INTO public."ProductSize" VALUES (789, 93, 31, 0);
INSERT INTO public."ProductSize" VALUES (790, 93, 32, 13);
INSERT INTO public."ProductSize" VALUES (791, 93, 33, 11);
INSERT INTO public."ProductSize" VALUES (792, 93, 34, 0);
INSERT INTO public."ProductSize" VALUES (793, 93, 35, 9);
INSERT INTO public."ProductSize" VALUES (794, 93, 36, 6);
INSERT INTO public."ProductSize" VALUES (795, 93, 37, 12);
INSERT INTO public."ProductSize" VALUES (796, 94, 21, 11);
INSERT INTO public."ProductSize" VALUES (797, 94, 22, 0);
INSERT INTO public."ProductSize" VALUES (798, 94, 23, 9);
INSERT INTO public."ProductSize" VALUES (799, 94, 24, 13);
INSERT INTO public."ProductSize" VALUES (800, 94, 25, 0);
INSERT INTO public."ProductSize" VALUES (801, 94, 26, 8);
INSERT INTO public."ProductSize" VALUES (802, 94, 27, 12);
INSERT INTO public."ProductSize" VALUES (803, 94, 28, 5);
INSERT INTO public."ProductSize" VALUES (804, 94, 29, 0);
INSERT INTO public."ProductSize" VALUES (805, 94, 30, 11);
INSERT INTO public."ProductSize" VALUES (806, 94, 31, 7);
INSERT INTO public."ProductSize" VALUES (807, 94, 32, 0);
INSERT INTO public."ProductSize" VALUES (808, 94, 33, 13);
INSERT INTO public."ProductSize" VALUES (809, 94, 34, 10);
INSERT INTO public."ProductSize" VALUES (810, 94, 35, 0);
INSERT INTO public."ProductSize" VALUES (811, 94, 36, 9);
INSERT INTO public."ProductSize" VALUES (812, 94, 37, 6);
INSERT INTO public."ProductSize" VALUES (813, 95, 21, 0);
INSERT INTO public."ProductSize" VALUES (814, 95, 22, 12);
INSERT INTO public."ProductSize" VALUES (815, 95, 23, 7);
INSERT INTO public."ProductSize" VALUES (816, 95, 24, 0);
INSERT INTO public."ProductSize" VALUES (817, 95, 25, 10);
INSERT INTO public."ProductSize" VALUES (818, 95, 26, 13);
INSERT INTO public."ProductSize" VALUES (819, 95, 27, 6);
INSERT INTO public."ProductSize" VALUES (820, 95, 28, 0);
INSERT INTO public."ProductSize" VALUES (821, 95, 29, 11);
INSERT INTO public."ProductSize" VALUES (822, 95, 30, 8);
INSERT INTO public."ProductSize" VALUES (823, 95, 31, 0);
INSERT INTO public."ProductSize" VALUES (824, 95, 32, 12);
INSERT INTO public."ProductSize" VALUES (825, 95, 33, 9);
INSERT INTO public."ProductSize" VALUES (826, 95, 34, 0);
INSERT INTO public."ProductSize" VALUES (827, 95, 35, 13);
INSERT INTO public."ProductSize" VALUES (828, 95, 36, 7);
INSERT INTO public."ProductSize" VALUES (829, 95, 37, 11);
INSERT INTO public."ProductSize" VALUES (830, 96, 21, 13);
INSERT INTO public."ProductSize" VALUES (831, 96, 22, 0);
INSERT INTO public."ProductSize" VALUES (832, 96, 23, 10);
INSERT INTO public."ProductSize" VALUES (833, 96, 24, 8);
INSERT INTO public."ProductSize" VALUES (834, 96, 25, 0);
INSERT INTO public."ProductSize" VALUES (835, 96, 26, 12);
INSERT INTO public."ProductSize" VALUES (836, 96, 27, 7);
INSERT INTO public."ProductSize" VALUES (837, 96, 28, 0);
INSERT INTO public."ProductSize" VALUES (838, 96, 29, 13);
INSERT INTO public."ProductSize" VALUES (839, 96, 30, 6);
INSERT INTO public."ProductSize" VALUES (840, 96, 31, 0);
INSERT INTO public."ProductSize" VALUES (841, 96, 32, 11);
INSERT INTO public."ProductSize" VALUES (842, 96, 33, 9);
INSERT INTO public."ProductSize" VALUES (843, 96, 34, 0);
INSERT INTO public."ProductSize" VALUES (844, 96, 35, 12);
INSERT INTO public."ProductSize" VALUES (845, 96, 36, 8);
INSERT INTO public."ProductSize" VALUES (846, 96, 37, 0);
INSERT INTO public."ProductSize" VALUES (847, 97, 21, 0);
INSERT INTO public."ProductSize" VALUES (848, 97, 22, 11);
INSERT INTO public."ProductSize" VALUES (849, 97, 23, 13);
INSERT INTO public."ProductSize" VALUES (850, 97, 24, 0);
INSERT INTO public."ProductSize" VALUES (851, 97, 25, 9);
INSERT INTO public."ProductSize" VALUES (852, 97, 26, 12);
INSERT INTO public."ProductSize" VALUES (853, 97, 27, 6);
INSERT INTO public."ProductSize" VALUES (854, 97, 28, 0);
INSERT INTO public."ProductSize" VALUES (855, 97, 29, 10);
INSERT INTO public."ProductSize" VALUES (856, 97, 30, 8);
INSERT INTO public."ProductSize" VALUES (857, 97, 31, 0);
INSERT INTO public."ProductSize" VALUES (858, 97, 32, 13);
INSERT INTO public."ProductSize" VALUES (859, 97, 33, 11);
INSERT INTO public."ProductSize" VALUES (860, 97, 34, 0);
INSERT INTO public."ProductSize" VALUES (861, 97, 35, 12);
INSERT INTO public."ProductSize" VALUES (862, 97, 36, 7);
INSERT INTO public."ProductSize" VALUES (863, 97, 37, 10);
INSERT INTO public."ProductSize" VALUES (864, 98, 21, 12);
INSERT INTO public."ProductSize" VALUES (865, 98, 22, 0);
INSERT INTO public."ProductSize" VALUES (866, 98, 23, 11);
INSERT INTO public."ProductSize" VALUES (867, 98, 24, 9);
INSERT INTO public."ProductSize" VALUES (868, 98, 25, 0);
INSERT INTO public."ProductSize" VALUES (869, 98, 26, 13);
INSERT INTO public."ProductSize" VALUES (870, 98, 27, 8);
INSERT INTO public."ProductSize" VALUES (871, 98, 28, 0);
INSERT INTO public."ProductSize" VALUES (872, 98, 29, 12);
INSERT INTO public."ProductSize" VALUES (873, 98, 30, 7);
INSERT INTO public."ProductSize" VALUES (874, 98, 31, 0);
INSERT INTO public."ProductSize" VALUES (875, 98, 32, 10);
INSERT INTO public."ProductSize" VALUES (876, 98, 33, 13);
INSERT INTO public."ProductSize" VALUES (877, 98, 34, 0);
INSERT INTO public."ProductSize" VALUES (878, 98, 35, 11);
INSERT INTO public."ProductSize" VALUES (879, 98, 36, 9);
INSERT INTO public."ProductSize" VALUES (880, 98, 37, 0);
INSERT INTO public."ProductSize" VALUES (881, 1, 38, 0);
INSERT INTO public."ProductSize" VALUES (882, 1, 39, 11);
INSERT INTO public."ProductSize" VALUES (883, 1, 40, 8);
INSERT INTO public."ProductSize" VALUES (884, 1, 41, 0);
INSERT INTO public."ProductSize" VALUES (885, 1, 42, 13);
INSERT INTO public."ProductSize" VALUES (886, 1, 43, 6);
INSERT INTO public."ProductSize" VALUES (887, 1, 44, 0);
INSERT INTO public."ProductSize" VALUES (888, 1, 45, 10);
INSERT INTO public."ProductSize" VALUES (889, 1, 46, 12);
INSERT INTO public."ProductSize" VALUES (890, 1, 47, 0);
INSERT INTO public."ProductSize" VALUES (891, 1, 48, 9);
INSERT INTO public."ProductSize" VALUES (892, 1, 49, 7);
INSERT INTO public."ProductSize" VALUES (893, 1, 50, 0);
INSERT INTO public."ProductSize" VALUES (894, 1, 51, 13);
INSERT INTO public."ProductSize" VALUES (895, 1, 52, 11);
INSERT INTO public."ProductSize" VALUES (896, 1, 53, 0);
INSERT INTO public."ProductSize" VALUES (897, 1, 54, 8);
INSERT INTO public."ProductSize" VALUES (898, 1, 55, 12);
INSERT INTO public."ProductSize" VALUES (899, 1, 56, 5);
INSERT INTO public."ProductSize" VALUES (900, 2, 38, 10);
INSERT INTO public."ProductSize" VALUES (901, 2, 39, 0);
INSERT INTO public."ProductSize" VALUES (902, 2, 40, 12);
INSERT INTO public."ProductSize" VALUES (903, 2, 41, 7);
INSERT INTO public."ProductSize" VALUES (904, 2, 42, 0);
INSERT INTO public."ProductSize" VALUES (905, 2, 43, 11);
INSERT INTO public."ProductSize" VALUES (906, 2, 44, 13);
INSERT INTO public."ProductSize" VALUES (907, 2, 45, 0);
INSERT INTO public."ProductSize" VALUES (908, 2, 46, 9);
INSERT INTO public."ProductSize" VALUES (909, 2, 47, 6);
INSERT INTO public."ProductSize" VALUES (910, 2, 48, 0);
INSERT INTO public."ProductSize" VALUES (911, 2, 49, 12);
INSERT INTO public."ProductSize" VALUES (912, 2, 50, 10);
INSERT INTO public."ProductSize" VALUES (913, 2, 51, 0);
INSERT INTO public."ProductSize" VALUES (914, 2, 52, 8);
INSERT INTO public."ProductSize" VALUES (915, 2, 53, 13);
INSERT INTO public."ProductSize" VALUES (916, 2, 54, 0);
INSERT INTO public."ProductSize" VALUES (917, 2, 55, 11);
INSERT INTO public."ProductSize" VALUES (918, 2, 56, 7);
INSERT INTO public."ProductSize" VALUES (919, 3, 38, 0);
INSERT INTO public."ProductSize" VALUES (920, 3, 39, 13);
INSERT INTO public."ProductSize" VALUES (921, 3, 40, 9);
INSERT INTO public."ProductSize" VALUES (922, 3, 41, 0);
INSERT INTO public."ProductSize" VALUES (923, 3, 42, 12);
INSERT INTO public."ProductSize" VALUES (924, 3, 43, 7);
INSERT INTO public."ProductSize" VALUES (925, 3, 44, 0);
INSERT INTO public."ProductSize" VALUES (926, 3, 45, 11);
INSERT INTO public."ProductSize" VALUES (927, 3, 46, 13);
INSERT INTO public."ProductSize" VALUES (928, 3, 47, 0);
INSERT INTO public."ProductSize" VALUES (929, 3, 48, 10);
INSERT INTO public."ProductSize" VALUES (930, 3, 49, 8);
INSERT INTO public."ProductSize" VALUES (931, 3, 50, 0);
INSERT INTO public."ProductSize" VALUES (932, 3, 51, 12);
INSERT INTO public."ProductSize" VALUES (933, 3, 52, 9);
INSERT INTO public."ProductSize" VALUES (934, 3, 53, 0);
INSERT INTO public."ProductSize" VALUES (935, 3, 54, 13);
INSERT INTO public."ProductSize" VALUES (936, 3, 55, 11);
INSERT INTO public."ProductSize" VALUES (937, 3, 56, 6);
INSERT INTO public."ProductSize" VALUES (938, 4, 38, 12);
INSERT INTO public."ProductSize" VALUES (939, 4, 39, 0);
INSERT INTO public."ProductSize" VALUES (940, 4, 40, 11);
INSERT INTO public."ProductSize" VALUES (941, 4, 41, 8);
INSERT INTO public."ProductSize" VALUES (942, 4, 42, 0);
INSERT INTO public."ProductSize" VALUES (943, 4, 43, 13);
INSERT INTO public."ProductSize" VALUES (944, 4, 44, 10);
INSERT INTO public."ProductSize" VALUES (945, 4, 45, 0);
INSERT INTO public."ProductSize" VALUES (946, 4, 46, 12);
INSERT INTO public."ProductSize" VALUES (947, 4, 47, 7);
INSERT INTO public."ProductSize" VALUES (948, 4, 48, 0);
INSERT INTO public."ProductSize" VALUES (949, 4, 49, 11);
INSERT INTO public."ProductSize" VALUES (950, 4, 50, 13);
INSERT INTO public."ProductSize" VALUES (951, 4, 51, 0);
INSERT INTO public."ProductSize" VALUES (952, 4, 52, 9);
INSERT INTO public."ProductSize" VALUES (953, 4, 53, 12);
INSERT INTO public."ProductSize" VALUES (954, 4, 54, 0);
INSERT INTO public."ProductSize" VALUES (955, 4, 55, 10);
INSERT INTO public."ProductSize" VALUES (956, 4, 56, 8);
INSERT INTO public."ProductSize" VALUES (957, 5, 38, 0);
INSERT INTO public."ProductSize" VALUES (958, 5, 39, 10);
INSERT INTO public."ProductSize" VALUES (959, 5, 40, 13);
INSERT INTO public."ProductSize" VALUES (960, 5, 41, 0);
INSERT INTO public."ProductSize" VALUES (961, 5, 42, 11);
INSERT INTO public."ProductSize" VALUES (962, 5, 43, 8);
INSERT INTO public."ProductSize" VALUES (963, 5, 44, 0);
INSERT INTO public."ProductSize" VALUES (964, 5, 45, 12);
INSERT INTO public."ProductSize" VALUES (965, 5, 46, 9);
INSERT INTO public."ProductSize" VALUES (966, 5, 47, 0);
INSERT INTO public."ProductSize" VALUES (967, 5, 48, 13);
INSERT INTO public."ProductSize" VALUES (968, 5, 49, 11);
INSERT INTO public."ProductSize" VALUES (969, 5, 50, 0);
INSERT INTO public."ProductSize" VALUES (970, 5, 51, 10);
INSERT INTO public."ProductSize" VALUES (971, 5, 52, 12);
INSERT INTO public."ProductSize" VALUES (972, 5, 53, 0);
INSERT INTO public."ProductSize" VALUES (973, 5, 54, 11);
INSERT INTO public."ProductSize" VALUES (974, 5, 55, 9);
INSERT INTO public."ProductSize" VALUES (975, 5, 56, 7);
INSERT INTO public."ProductSize" VALUES (976, 6, 38, 11);
INSERT INTO public."ProductSize" VALUES (977, 6, 39, 0);
INSERT INTO public."ProductSize" VALUES (978, 6, 40, 13);
INSERT INTO public."ProductSize" VALUES (979, 6, 41, 9);
INSERT INTO public."ProductSize" VALUES (980, 6, 42, 0);
INSERT INTO public."ProductSize" VALUES (981, 6, 43, 12);
INSERT INTO public."ProductSize" VALUES (982, 6, 44, 8);
INSERT INTO public."ProductSize" VALUES (983, 6, 45, 0);
INSERT INTO public."ProductSize" VALUES (984, 6, 46, 11);
INSERT INTO public."ProductSize" VALUES (985, 6, 47, 13);
INSERT INTO public."ProductSize" VALUES (986, 6, 48, 0);
INSERT INTO public."ProductSize" VALUES (987, 6, 49, 10);
INSERT INTO public."ProductSize" VALUES (988, 6, 50, 12);
INSERT INTO public."ProductSize" VALUES (989, 6, 51, 0);
INSERT INTO public."ProductSize" VALUES (990, 6, 52, 11);
INSERT INTO public."ProductSize" VALUES (991, 6, 53, 13);
INSERT INTO public."ProductSize" VALUES (992, 6, 54, 0);
INSERT INTO public."ProductSize" VALUES (993, 6, 55, 9);
INSERT INTO public."ProductSize" VALUES (994, 6, 56, 12);
INSERT INTO public."ProductSize" VALUES (995, 7, 38, 0);
INSERT INTO public."ProductSize" VALUES (996, 7, 39, 12);
INSERT INTO public."ProductSize" VALUES (997, 7, 40, 10);
INSERT INTO public."ProductSize" VALUES (998, 7, 41, 0);
INSERT INTO public."ProductSize" VALUES (999, 7, 42, 13);
INSERT INTO public."ProductSize" VALUES (1000, 7, 43, 11);
INSERT INTO public."ProductSize" VALUES (1001, 7, 44, 0);
INSERT INTO public."ProductSize" VALUES (1002, 7, 45, 9);
INSERT INTO public."ProductSize" VALUES (1003, 7, 46, 12);
INSERT INTO public."ProductSize" VALUES (1004, 7, 47, 0);
INSERT INTO public."ProductSize" VALUES (1005, 7, 48, 11);
INSERT INTO public."ProductSize" VALUES (1006, 7, 49, 13);
INSERT INTO public."ProductSize" VALUES (1007, 7, 50, 0);
INSERT INTO public."ProductSize" VALUES (1008, 7, 51, 10);
INSERT INTO public."ProductSize" VALUES (1009, 7, 52, 12);
INSERT INTO public."ProductSize" VALUES (1010, 7, 53, 0);
INSERT INTO public."ProductSize" VALUES (1011, 7, 54, 11);
INSERT INTO public."ProductSize" VALUES (1012, 7, 55, 13);
INSERT INTO public."ProductSize" VALUES (1013, 7, 56, 8);
INSERT INTO public."ProductSize" VALUES (1014, 8, 38, 13);
INSERT INTO public."ProductSize" VALUES (1015, 8, 39, 0);
INSERT INTO public."ProductSize" VALUES (1016, 8, 40, 11);
INSERT INTO public."ProductSize" VALUES (1017, 8, 41, 10);
INSERT INTO public."ProductSize" VALUES (1018, 8, 42, 0);
INSERT INTO public."ProductSize" VALUES (1019, 8, 43, 12);
INSERT INTO public."ProductSize" VALUES (1020, 8, 44, 9);
INSERT INTO public."ProductSize" VALUES (1021, 8, 45, 0);
INSERT INTO public."ProductSize" VALUES (1022, 8, 46, 13);
INSERT INTO public."ProductSize" VALUES (1023, 8, 47, 11);
INSERT INTO public."ProductSize" VALUES (1024, 8, 48, 0);
INSERT INTO public."ProductSize" VALUES (1025, 8, 49, 12);
INSERT INTO public."ProductSize" VALUES (1026, 8, 50, 10);
INSERT INTO public."ProductSize" VALUES (1027, 8, 51, 0);
INSERT INTO public."ProductSize" VALUES (1028, 8, 52, 13);
INSERT INTO public."ProductSize" VALUES (1029, 8, 53, 11);
INSERT INTO public."ProductSize" VALUES (1030, 8, 54, 0);
INSERT INTO public."ProductSize" VALUES (1031, 8, 55, 12);
INSERT INTO public."ProductSize" VALUES (1032, 8, 56, 9);
INSERT INTO public."ProductSize" VALUES (1033, 9, 38, 0);
INSERT INTO public."ProductSize" VALUES (1034, 9, 39, 11);
INSERT INTO public."ProductSize" VALUES (1035, 9, 40, 13);
INSERT INTO public."ProductSize" VALUES (1036, 9, 41, 0);
INSERT INTO public."ProductSize" VALUES (1037, 9, 42, 10);
INSERT INTO public."ProductSize" VALUES (1038, 9, 43, 12);
INSERT INTO public."ProductSize" VALUES (1039, 9, 44, 0);
INSERT INTO public."ProductSize" VALUES (1040, 9, 45, 11);
INSERT INTO public."ProductSize" VALUES (1041, 9, 46, 13);
INSERT INTO public."ProductSize" VALUES (1042, 9, 47, 0);
INSERT INTO public."ProductSize" VALUES (1043, 9, 48, 12);
INSERT INTO public."ProductSize" VALUES (1044, 9, 49, 10);
INSERT INTO public."ProductSize" VALUES (1045, 9, 50, 0);
INSERT INTO public."ProductSize" VALUES (1046, 9, 51, 11);
INSERT INTO public."ProductSize" VALUES (1047, 9, 52, 13);
INSERT INTO public."ProductSize" VALUES (1048, 9, 53, 0);
INSERT INTO public."ProductSize" VALUES (1049, 9, 54, 12);
INSERT INTO public."ProductSize" VALUES (1050, 9, 55, 11);
INSERT INTO public."ProductSize" VALUES (1051, 9, 56, 10);
INSERT INTO public."ProductSize" VALUES (1052, 10, 38, 12);
INSERT INTO public."ProductSize" VALUES (1053, 10, 39, 0);
INSERT INTO public."ProductSize" VALUES (1054, 10, 40, 13);
INSERT INTO public."ProductSize" VALUES (1055, 10, 41, 11);
INSERT INTO public."ProductSize" VALUES (1056, 10, 42, 0);
INSERT INTO public."ProductSize" VALUES (1057, 10, 43, 10);
INSERT INTO public."ProductSize" VALUES (1058, 10, 44, 12);
INSERT INTO public."ProductSize" VALUES (1059, 10, 45, 0);
INSERT INTO public."ProductSize" VALUES (1060, 10, 46, 13);
INSERT INTO public."ProductSize" VALUES (1061, 10, 47, 11);
INSERT INTO public."ProductSize" VALUES (1062, 10, 48, 0);
INSERT INTO public."ProductSize" VALUES (1063, 10, 49, 12);
INSERT INTO public."ProductSize" VALUES (1064, 10, 50, 13);
INSERT INTO public."ProductSize" VALUES (1065, 10, 51, 0);
INSERT INTO public."ProductSize" VALUES (1066, 10, 52, 11);
INSERT INTO public."ProductSize" VALUES (1067, 10, 53, 12);
INSERT INTO public."ProductSize" VALUES (1068, 10, 54, 0);
INSERT INTO public."ProductSize" VALUES (1069, 10, 55, 13);
INSERT INTO public."ProductSize" VALUES (1070, 10, 56, 11);
INSERT INTO public."ProductSize" VALUES (1071, 11, 38, 0);
INSERT INTO public."ProductSize" VALUES (1072, 11, 39, 13);
INSERT INTO public."ProductSize" VALUES (1073, 11, 40, 12);
INSERT INTO public."ProductSize" VALUES (1074, 11, 41, 0);
INSERT INTO public."ProductSize" VALUES (1075, 11, 42, 11);
INSERT INTO public."ProductSize" VALUES (1076, 11, 43, 13);
INSERT INTO public."ProductSize" VALUES (1077, 11, 44, 0);
INSERT INTO public."ProductSize" VALUES (1078, 11, 45, 12);
INSERT INTO public."ProductSize" VALUES (1079, 11, 46, 11);
INSERT INTO public."ProductSize" VALUES (1080, 11, 47, 0);
INSERT INTO public."ProductSize" VALUES (1081, 11, 48, 13);
INSERT INTO public."ProductSize" VALUES (1082, 11, 49, 12);
INSERT INTO public."ProductSize" VALUES (1083, 11, 50, 0);
INSERT INTO public."ProductSize" VALUES (1084, 11, 51, 13);
INSERT INTO public."ProductSize" VALUES (1085, 11, 52, 11);
INSERT INTO public."ProductSize" VALUES (1086, 11, 53, 0);
INSERT INTO public."ProductSize" VALUES (1087, 11, 54, 12);
INSERT INTO public."ProductSize" VALUES (1088, 11, 55, 13);
INSERT INTO public."ProductSize" VALUES (1089, 11, 56, 10);
INSERT INTO public."ProductSize" VALUES (1090, 12, 38, 11);
INSERT INTO public."ProductSize" VALUES (1091, 12, 39, 0);
INSERT INTO public."ProductSize" VALUES (1092, 12, 40, 13);
INSERT INTO public."ProductSize" VALUES (1093, 12, 41, 12);
INSERT INTO public."ProductSize" VALUES (1094, 12, 42, 0);
INSERT INTO public."ProductSize" VALUES (1095, 12, 43, 11);
INSERT INTO public."ProductSize" VALUES (1096, 12, 44, 13);
INSERT INTO public."ProductSize" VALUES (1097, 12, 45, 0);
INSERT INTO public."ProductSize" VALUES (1098, 12, 46, 12);
INSERT INTO public."ProductSize" VALUES (1099, 12, 47, 11);
INSERT INTO public."ProductSize" VALUES (1100, 12, 48, 0);
INSERT INTO public."ProductSize" VALUES (1101, 12, 49, 13);
INSERT INTO public."ProductSize" VALUES (1102, 12, 50, 12);
INSERT INTO public."ProductSize" VALUES (1103, 12, 51, 0);
INSERT INTO public."ProductSize" VALUES (1104, 12, 52, 11);
INSERT INTO public."ProductSize" VALUES (1105, 12, 53, 13);
INSERT INTO public."ProductSize" VALUES (1106, 12, 54, 0);
INSERT INTO public."ProductSize" VALUES (1107, 12, 55, 12);
INSERT INTO public."ProductSize" VALUES (1108, 12, 56, 11);
INSERT INTO public."ProductSize" VALUES (1109, 13, 38, 0);
INSERT INTO public."ProductSize" VALUES (1110, 13, 39, 12);
INSERT INTO public."ProductSize" VALUES (1111, 13, 40, 13);
INSERT INTO public."ProductSize" VALUES (1112, 13, 41, 0);
INSERT INTO public."ProductSize" VALUES (1113, 13, 42, 11);
INSERT INTO public."ProductSize" VALUES (1114, 13, 43, 12);
INSERT INTO public."ProductSize" VALUES (1115, 13, 44, 0);
INSERT INTO public."ProductSize" VALUES (1116, 13, 45, 13);
INSERT INTO public."ProductSize" VALUES (1117, 13, 46, 11);
INSERT INTO public."ProductSize" VALUES (1118, 13, 47, 0);
INSERT INTO public."ProductSize" VALUES (1119, 13, 48, 12);
INSERT INTO public."ProductSize" VALUES (1120, 13, 49, 13);
INSERT INTO public."ProductSize" VALUES (1121, 13, 50, 0);
INSERT INTO public."ProductSize" VALUES (1122, 13, 51, 12);
INSERT INTO public."ProductSize" VALUES (1123, 13, 52, 11);
INSERT INTO public."ProductSize" VALUES (1124, 13, 53, 0);
INSERT INTO public."ProductSize" VALUES (1125, 13, 54, 13);
INSERT INTO public."ProductSize" VALUES (1126, 13, 55, 12);
INSERT INTO public."ProductSize" VALUES (1127, 13, 56, 11);
INSERT INTO public."ProductSize" VALUES (1128, 14, 38, 13);
INSERT INTO public."ProductSize" VALUES (1129, 14, 39, 0);
INSERT INTO public."ProductSize" VALUES (1130, 14, 40, 12);
INSERT INTO public."ProductSize" VALUES (1131, 14, 41, 11);
INSERT INTO public."ProductSize" VALUES (1132, 14, 42, 0);
INSERT INTO public."ProductSize" VALUES (1133, 14, 43, 13);
INSERT INTO public."ProductSize" VALUES (1134, 14, 44, 12);
INSERT INTO public."ProductSize" VALUES (1135, 14, 45, 0);
INSERT INTO public."ProductSize" VALUES (1136, 14, 46, 11);
INSERT INTO public."ProductSize" VALUES (1137, 14, 47, 13);
INSERT INTO public."ProductSize" VALUES (1138, 14, 48, 0);
INSERT INTO public."ProductSize" VALUES (1139, 14, 49, 12);
INSERT INTO public."ProductSize" VALUES (1140, 14, 50, 11);
INSERT INTO public."ProductSize" VALUES (1141, 14, 51, 0);
INSERT INTO public."ProductSize" VALUES (1142, 14, 52, 13);
INSERT INTO public."ProductSize" VALUES (1143, 14, 53, 12);
INSERT INTO public."ProductSize" VALUES (1144, 14, 54, 0);
INSERT INTO public."ProductSize" VALUES (1145, 14, 55, 11);
INSERT INTO public."ProductSize" VALUES (1146, 14, 56, 13);
INSERT INTO public."ProductSize" VALUES (1147, 15, 38, 0);
INSERT INTO public."ProductSize" VALUES (1148, 15, 39, 11);
INSERT INTO public."ProductSize" VALUES (1149, 15, 40, 13);
INSERT INTO public."ProductSize" VALUES (1150, 15, 41, 0);
INSERT INTO public."ProductSize" VALUES (1151, 15, 42, 12);
INSERT INTO public."ProductSize" VALUES (1152, 15, 43, 11);
INSERT INTO public."ProductSize" VALUES (1153, 15, 44, 0);
INSERT INTO public."ProductSize" VALUES (1154, 15, 45, 13);
INSERT INTO public."ProductSize" VALUES (1155, 15, 46, 12);
INSERT INTO public."ProductSize" VALUES (1156, 15, 47, 0);
INSERT INTO public."ProductSize" VALUES (1157, 15, 48, 11);
INSERT INTO public."ProductSize" VALUES (1158, 15, 49, 13);
INSERT INTO public."ProductSize" VALUES (1159, 15, 50, 0);
INSERT INTO public."ProductSize" VALUES (1160, 15, 51, 12);
INSERT INTO public."ProductSize" VALUES (1161, 15, 52, 11);
INSERT INTO public."ProductSize" VALUES (1162, 15, 53, 0);
INSERT INTO public."ProductSize" VALUES (1163, 15, 54, 13);
INSERT INTO public."ProductSize" VALUES (1164, 15, 55, 12);
INSERT INTO public."ProductSize" VALUES (1165, 15, 56, 11);
INSERT INTO public."ProductSize" VALUES (1166, 16, 38, 12);
INSERT INTO public."ProductSize" VALUES (1167, 16, 39, 0);
INSERT INTO public."ProductSize" VALUES (1168, 16, 40, 13);
INSERT INTO public."ProductSize" VALUES (1169, 16, 41, 11);
INSERT INTO public."ProductSize" VALUES (1170, 16, 42, 0);
INSERT INTO public."ProductSize" VALUES (1171, 16, 43, 12);
INSERT INTO public."ProductSize" VALUES (1172, 16, 44, 13);
INSERT INTO public."ProductSize" VALUES (1173, 16, 45, 0);
INSERT INTO public."ProductSize" VALUES (1174, 16, 46, 11);
INSERT INTO public."ProductSize" VALUES (1175, 16, 47, 12);
INSERT INTO public."ProductSize" VALUES (1176, 16, 48, 0);
INSERT INTO public."ProductSize" VALUES (1177, 16, 49, 13);
INSERT INTO public."ProductSize" VALUES (1178, 16, 50, 11);
INSERT INTO public."ProductSize" VALUES (1179, 16, 51, 0);
INSERT INTO public."ProductSize" VALUES (1180, 16, 52, 12);
INSERT INTO public."ProductSize" VALUES (1181, 16, 53, 13);
INSERT INTO public."ProductSize" VALUES (1182, 16, 54, 0);
INSERT INTO public."ProductSize" VALUES (1183, 16, 55, 11);
INSERT INTO public."ProductSize" VALUES (1184, 16, 56, 12);
INSERT INTO public."ProductSize" VALUES (1185, 17, 38, 0);
INSERT INTO public."ProductSize" VALUES (1186, 17, 39, 13);
INSERT INTO public."ProductSize" VALUES (1187, 17, 40, 12);
INSERT INTO public."ProductSize" VALUES (1188, 17, 41, 0);
INSERT INTO public."ProductSize" VALUES (1189, 17, 42, 11);
INSERT INTO public."ProductSize" VALUES (1190, 17, 43, 13);
INSERT INTO public."ProductSize" VALUES (1191, 17, 44, 0);
INSERT INTO public."ProductSize" VALUES (1192, 17, 45, 12);
INSERT INTO public."ProductSize" VALUES (1193, 17, 46, 11);
INSERT INTO public."ProductSize" VALUES (1194, 17, 47, 0);
INSERT INTO public."ProductSize" VALUES (1195, 17, 48, 13);
INSERT INTO public."ProductSize" VALUES (1196, 17, 49, 12);
INSERT INTO public."ProductSize" VALUES (1197, 17, 50, 0);
INSERT INTO public."ProductSize" VALUES (1198, 17, 51, 11);
INSERT INTO public."ProductSize" VALUES (1199, 17, 52, 13);
INSERT INTO public."ProductSize" VALUES (1200, 17, 53, 0);
INSERT INTO public."ProductSize" VALUES (1201, 17, 54, 12);
INSERT INTO public."ProductSize" VALUES (1202, 17, 55, 13);
INSERT INTO public."ProductSize" VALUES (1203, 17, 56, 11);
INSERT INTO public."ProductSize" VALUES (1204, 18, 38, 11);
INSERT INTO public."ProductSize" VALUES (1205, 18, 39, 0);
INSERT INTO public."ProductSize" VALUES (1206, 18, 40, 13);
INSERT INTO public."ProductSize" VALUES (1207, 18, 41, 12);
INSERT INTO public."ProductSize" VALUES (1208, 18, 42, 0);
INSERT INTO public."ProductSize" VALUES (1209, 18, 43, 11);
INSERT INTO public."ProductSize" VALUES (1210, 18, 44, 13);
INSERT INTO public."ProductSize" VALUES (1211, 18, 45, 0);
INSERT INTO public."ProductSize" VALUES (1212, 18, 46, 12);
INSERT INTO public."ProductSize" VALUES (1213, 18, 47, 11);
INSERT INTO public."ProductSize" VALUES (1214, 18, 48, 0);
INSERT INTO public."ProductSize" VALUES (1215, 18, 49, 13);
INSERT INTO public."ProductSize" VALUES (1216, 18, 50, 12);
INSERT INTO public."ProductSize" VALUES (1217, 18, 51, 0);
INSERT INTO public."ProductSize" VALUES (1218, 18, 52, 11);
INSERT INTO public."ProductSize" VALUES (1219, 18, 53, 13);
INSERT INTO public."ProductSize" VALUES (1220, 18, 54, 0);
INSERT INTO public."ProductSize" VALUES (1221, 18, 55, 12);
INSERT INTO public."ProductSize" VALUES (1222, 18, 56, 11);
INSERT INTO public."ProductSize" VALUES (1223, 19, 38, 0);
INSERT INTO public."ProductSize" VALUES (1224, 19, 39, 12);
INSERT INTO public."ProductSize" VALUES (1225, 19, 40, 13);
INSERT INTO public."ProductSize" VALUES (1226, 19, 41, 0);
INSERT INTO public."ProductSize" VALUES (1227, 19, 42, 11);
INSERT INTO public."ProductSize" VALUES (1228, 19, 43, 12);
INSERT INTO public."ProductSize" VALUES (1229, 19, 44, 0);
INSERT INTO public."ProductSize" VALUES (1230, 19, 45, 13);
INSERT INTO public."ProductSize" VALUES (1231, 19, 46, 11);
INSERT INTO public."ProductSize" VALUES (1232, 19, 47, 0);
INSERT INTO public."ProductSize" VALUES (1233, 19, 48, 12);
INSERT INTO public."ProductSize" VALUES (1234, 19, 49, 13);
INSERT INTO public."ProductSize" VALUES (1235, 19, 50, 0);
INSERT INTO public."ProductSize" VALUES (1236, 19, 51, 12);
INSERT INTO public."ProductSize" VALUES (1237, 19, 52, 11);
INSERT INTO public."ProductSize" VALUES (1238, 19, 53, 0);
INSERT INTO public."ProductSize" VALUES (1239, 19, 54, 13);
INSERT INTO public."ProductSize" VALUES (1240, 19, 55, 12);
INSERT INTO public."ProductSize" VALUES (1241, 19, 56, 11);
INSERT INTO public."ProductSize" VALUES (1242, 20, 38, 13);
INSERT INTO public."ProductSize" VALUES (1243, 20, 39, 0);
INSERT INTO public."ProductSize" VALUES (1244, 20, 40, 12);
INSERT INTO public."ProductSize" VALUES (1245, 20, 41, 11);
INSERT INTO public."ProductSize" VALUES (1246, 20, 42, 0);
INSERT INTO public."ProductSize" VALUES (1247, 20, 43, 13);
INSERT INTO public."ProductSize" VALUES (1248, 20, 44, 12);
INSERT INTO public."ProductSize" VALUES (1249, 20, 45, 0);
INSERT INTO public."ProductSize" VALUES (1250, 20, 46, 11);
INSERT INTO public."ProductSize" VALUES (1251, 20, 47, 13);
INSERT INTO public."ProductSize" VALUES (1252, 20, 48, 0);
INSERT INTO public."ProductSize" VALUES (1253, 20, 49, 12);
INSERT INTO public."ProductSize" VALUES (1254, 20, 50, 11);
INSERT INTO public."ProductSize" VALUES (1255, 20, 51, 0);
INSERT INTO public."ProductSize" VALUES (1256, 20, 52, 13);
INSERT INTO public."ProductSize" VALUES (1257, 20, 53, 12);
INSERT INTO public."ProductSize" VALUES (1258, 20, 54, 0);
INSERT INTO public."ProductSize" VALUES (1259, 20, 55, 11);
INSERT INTO public."ProductSize" VALUES (1260, 20, 56, 13);
INSERT INTO public."ProductSize" VALUES (1261, 21, 38, 0);
INSERT INTO public."ProductSize" VALUES (1262, 21, 39, 11);
INSERT INTO public."ProductSize" VALUES (1263, 21, 40, 13);
INSERT INTO public."ProductSize" VALUES (1264, 21, 41, 0);
INSERT INTO public."ProductSize" VALUES (1265, 21, 42, 12);
INSERT INTO public."ProductSize" VALUES (1266, 21, 43, 11);
INSERT INTO public."ProductSize" VALUES (1267, 21, 44, 0);
INSERT INTO public."ProductSize" VALUES (1268, 21, 45, 13);
INSERT INTO public."ProductSize" VALUES (1269, 21, 46, 12);
INSERT INTO public."ProductSize" VALUES (1270, 21, 47, 0);
INSERT INTO public."ProductSize" VALUES (1271, 21, 48, 11);
INSERT INTO public."ProductSize" VALUES (1272, 21, 49, 13);
INSERT INTO public."ProductSize" VALUES (1273, 21, 50, 0);
INSERT INTO public."ProductSize" VALUES (1274, 21, 51, 12);
INSERT INTO public."ProductSize" VALUES (1275, 21, 52, 11);
INSERT INTO public."ProductSize" VALUES (1276, 21, 53, 0);
INSERT INTO public."ProductSize" VALUES (1277, 21, 54, 13);
INSERT INTO public."ProductSize" VALUES (1278, 21, 55, 12);
INSERT INTO public."ProductSize" VALUES (1279, 21, 56, 11);
INSERT INTO public."ProductSize" VALUES (1280, 22, 38, 12);
INSERT INTO public."ProductSize" VALUES (1281, 22, 39, 0);
INSERT INTO public."ProductSize" VALUES (1282, 22, 40, 13);
INSERT INTO public."ProductSize" VALUES (1283, 22, 41, 11);
INSERT INTO public."ProductSize" VALUES (1284, 22, 42, 0);
INSERT INTO public."ProductSize" VALUES (1285, 22, 43, 12);
INSERT INTO public."ProductSize" VALUES (1286, 22, 44, 13);
INSERT INTO public."ProductSize" VALUES (1287, 22, 45, 0);
INSERT INTO public."ProductSize" VALUES (1288, 22, 46, 11);
INSERT INTO public."ProductSize" VALUES (1289, 22, 47, 12);
INSERT INTO public."ProductSize" VALUES (1290, 22, 48, 0);
INSERT INTO public."ProductSize" VALUES (1291, 22, 49, 13);
INSERT INTO public."ProductSize" VALUES (1292, 22, 50, 11);
INSERT INTO public."ProductSize" VALUES (1293, 22, 51, 0);
INSERT INTO public."ProductSize" VALUES (1294, 22, 52, 12);
INSERT INTO public."ProductSize" VALUES (1295, 22, 53, 13);
INSERT INTO public."ProductSize" VALUES (1296, 22, 54, 0);
INSERT INTO public."ProductSize" VALUES (1297, 22, 55, 11);
INSERT INTO public."ProductSize" VALUES (1298, 22, 56, 12);
INSERT INTO public."ProductSize" VALUES (1299, 23, 38, 0);
INSERT INTO public."ProductSize" VALUES (1300, 23, 39, 13);
INSERT INTO public."ProductSize" VALUES (1301, 23, 40, 12);
INSERT INTO public."ProductSize" VALUES (1302, 23, 41, 0);
INSERT INTO public."ProductSize" VALUES (1303, 23, 42, 11);
INSERT INTO public."ProductSize" VALUES (1304, 23, 43, 13);
INSERT INTO public."ProductSize" VALUES (1305, 23, 44, 0);
INSERT INTO public."ProductSize" VALUES (1306, 23, 45, 12);
INSERT INTO public."ProductSize" VALUES (1307, 23, 46, 11);
INSERT INTO public."ProductSize" VALUES (1308, 23, 47, 0);
INSERT INTO public."ProductSize" VALUES (1309, 23, 48, 13);
INSERT INTO public."ProductSize" VALUES (1310, 23, 49, 12);
INSERT INTO public."ProductSize" VALUES (1311, 23, 50, 0);
INSERT INTO public."ProductSize" VALUES (1312, 23, 51, 11);
INSERT INTO public."ProductSize" VALUES (1313, 23, 52, 13);
INSERT INTO public."ProductSize" VALUES (1314, 23, 53, 0);
INSERT INTO public."ProductSize" VALUES (1315, 23, 54, 12);
INSERT INTO public."ProductSize" VALUES (1316, 23, 55, 13);
INSERT INTO public."ProductSize" VALUES (1317, 23, 56, 11);
INSERT INTO public."ProductSize" VALUES (1318, 24, 38, 11);
INSERT INTO public."ProductSize" VALUES (1319, 24, 39, 0);
INSERT INTO public."ProductSize" VALUES (1320, 24, 40, 13);
INSERT INTO public."ProductSize" VALUES (1321, 24, 41, 12);
INSERT INTO public."ProductSize" VALUES (1322, 24, 42, 0);
INSERT INTO public."ProductSize" VALUES (1323, 24, 43, 11);
INSERT INTO public."ProductSize" VALUES (1324, 24, 44, 13);
INSERT INTO public."ProductSize" VALUES (1325, 24, 45, 0);
INSERT INTO public."ProductSize" VALUES (1326, 24, 46, 12);
INSERT INTO public."ProductSize" VALUES (1327, 24, 47, 11);
INSERT INTO public."ProductSize" VALUES (1328, 24, 48, 0);
INSERT INTO public."ProductSize" VALUES (1329, 24, 49, 13);
INSERT INTO public."ProductSize" VALUES (1330, 24, 50, 12);
INSERT INTO public."ProductSize" VALUES (1331, 24, 51, 0);
INSERT INTO public."ProductSize" VALUES (1332, 24, 52, 11);
INSERT INTO public."ProductSize" VALUES (1333, 24, 53, 13);
INSERT INTO public."ProductSize" VALUES (1334, 24, 54, 0);
INSERT INTO public."ProductSize" VALUES (1335, 24, 55, 12);
INSERT INTO public."ProductSize" VALUES (1336, 24, 56, 11);
INSERT INTO public."ProductSize" VALUES (1337, 25, 38, 0);
INSERT INTO public."ProductSize" VALUES (1338, 25, 39, 12);
INSERT INTO public."ProductSize" VALUES (1339, 25, 40, 13);
INSERT INTO public."ProductSize" VALUES (1340, 25, 41, 0);
INSERT INTO public."ProductSize" VALUES (1341, 25, 42, 11);
INSERT INTO public."ProductSize" VALUES (1342, 25, 43, 12);
INSERT INTO public."ProductSize" VALUES (1343, 25, 44, 0);
INSERT INTO public."ProductSize" VALUES (1344, 25, 45, 13);
INSERT INTO public."ProductSize" VALUES (1345, 25, 46, 11);
INSERT INTO public."ProductSize" VALUES (1346, 25, 47, 0);
INSERT INTO public."ProductSize" VALUES (1347, 25, 48, 12);
INSERT INTO public."ProductSize" VALUES (1348, 25, 49, 13);
INSERT INTO public."ProductSize" VALUES (1349, 25, 50, 0);
INSERT INTO public."ProductSize" VALUES (1350, 25, 51, 12);
INSERT INTO public."ProductSize" VALUES (1351, 25, 52, 11);
INSERT INTO public."ProductSize" VALUES (1352, 25, 53, 0);
INSERT INTO public."ProductSize" VALUES (1353, 25, 54, 13);
INSERT INTO public."ProductSize" VALUES (1354, 25, 55, 12);
INSERT INTO public."ProductSize" VALUES (1355, 25, 56, 11);
INSERT INTO public."ProductSize" VALUES (1356, 26, 38, 13);
INSERT INTO public."ProductSize" VALUES (1357, 26, 39, 0);
INSERT INTO public."ProductSize" VALUES (1358, 26, 40, 12);
INSERT INTO public."ProductSize" VALUES (1359, 26, 41, 11);
INSERT INTO public."ProductSize" VALUES (1360, 26, 42, 0);
INSERT INTO public."ProductSize" VALUES (1361, 26, 43, 13);
INSERT INTO public."ProductSize" VALUES (1362, 26, 44, 12);
INSERT INTO public."ProductSize" VALUES (1363, 26, 45, 0);
INSERT INTO public."ProductSize" VALUES (1364, 26, 46, 11);
INSERT INTO public."ProductSize" VALUES (1365, 26, 47, 13);
INSERT INTO public."ProductSize" VALUES (1366, 26, 48, 0);
INSERT INTO public."ProductSize" VALUES (1367, 26, 49, 12);
INSERT INTO public."ProductSize" VALUES (1368, 26, 50, 11);
INSERT INTO public."ProductSize" VALUES (1369, 26, 51, 0);
INSERT INTO public."ProductSize" VALUES (1370, 26, 52, 13);
INSERT INTO public."ProductSize" VALUES (1371, 26, 53, 12);
INSERT INTO public."ProductSize" VALUES (1372, 26, 54, 0);
INSERT INTO public."ProductSize" VALUES (1373, 26, 55, 11);
INSERT INTO public."ProductSize" VALUES (1374, 26, 56, 13);
INSERT INTO public."ProductSize" VALUES (1375, 27, 38, 0);
INSERT INTO public."ProductSize" VALUES (1376, 27, 39, 11);
INSERT INTO public."ProductSize" VALUES (1377, 27, 40, 13);
INSERT INTO public."ProductSize" VALUES (1378, 27, 41, 0);
INSERT INTO public."ProductSize" VALUES (1379, 27, 42, 12);
INSERT INTO public."ProductSize" VALUES (1380, 27, 43, 11);
INSERT INTO public."ProductSize" VALUES (1381, 27, 44, 0);
INSERT INTO public."ProductSize" VALUES (1382, 27, 45, 13);
INSERT INTO public."ProductSize" VALUES (1383, 27, 46, 12);
INSERT INTO public."ProductSize" VALUES (1384, 27, 47, 0);
INSERT INTO public."ProductSize" VALUES (1385, 27, 48, 11);
INSERT INTO public."ProductSize" VALUES (1386, 27, 49, 13);
INSERT INTO public."ProductSize" VALUES (1387, 27, 50, 0);
INSERT INTO public."ProductSize" VALUES (1388, 27, 51, 12);
INSERT INTO public."ProductSize" VALUES (1389, 27, 52, 11);
INSERT INTO public."ProductSize" VALUES (1390, 27, 53, 0);
INSERT INTO public."ProductSize" VALUES (1391, 27, 54, 13);
INSERT INTO public."ProductSize" VALUES (1392, 27, 55, 12);
INSERT INTO public."ProductSize" VALUES (1393, 27, 56, 11);
INSERT INTO public."ProductSize" VALUES (1394, 28, 38, 12);
INSERT INTO public."ProductSize" VALUES (1395, 28, 39, 0);
INSERT INTO public."ProductSize" VALUES (1396, 28, 40, 13);
INSERT INTO public."ProductSize" VALUES (1397, 28, 41, 11);
INSERT INTO public."ProductSize" VALUES (1398, 28, 42, 0);
INSERT INTO public."ProductSize" VALUES (1399, 28, 43, 12);
INSERT INTO public."ProductSize" VALUES (1400, 28, 44, 13);
INSERT INTO public."ProductSize" VALUES (1401, 28, 45, 0);
INSERT INTO public."ProductSize" VALUES (1402, 28, 46, 11);
INSERT INTO public."ProductSize" VALUES (1403, 28, 47, 12);
INSERT INTO public."ProductSize" VALUES (1404, 28, 48, 0);
INSERT INTO public."ProductSize" VALUES (1405, 28, 49, 13);
INSERT INTO public."ProductSize" VALUES (1406, 28, 50, 11);
INSERT INTO public."ProductSize" VALUES (1407, 28, 51, 0);
INSERT INTO public."ProductSize" VALUES (1408, 28, 52, 12);
INSERT INTO public."ProductSize" VALUES (1409, 28, 53, 13);
INSERT INTO public."ProductSize" VALUES (1410, 28, 54, 0);
INSERT INTO public."ProductSize" VALUES (1411, 28, 55, 11);
INSERT INTO public."ProductSize" VALUES (1412, 28, 56, 12);
INSERT INTO public."ProductSize" VALUES (1413, 29, 38, 0);
INSERT INTO public."ProductSize" VALUES (1414, 29, 39, 13);
INSERT INTO public."ProductSize" VALUES (1415, 29, 40, 12);
INSERT INTO public."ProductSize" VALUES (1416, 29, 41, 0);
INSERT INTO public."ProductSize" VALUES (1417, 29, 42, 11);
INSERT INTO public."ProductSize" VALUES (1418, 29, 43, 13);
INSERT INTO public."ProductSize" VALUES (1419, 29, 44, 0);
INSERT INTO public."ProductSize" VALUES (1420, 29, 45, 12);
INSERT INTO public."ProductSize" VALUES (1421, 29, 46, 11);
INSERT INTO public."ProductSize" VALUES (1422, 29, 47, 0);
INSERT INTO public."ProductSize" VALUES (1423, 29, 48, 13);
INSERT INTO public."ProductSize" VALUES (1424, 29, 49, 12);
INSERT INTO public."ProductSize" VALUES (1425, 29, 50, 0);
INSERT INTO public."ProductSize" VALUES (1426, 29, 51, 11);
INSERT INTO public."ProductSize" VALUES (1427, 29, 52, 13);
INSERT INTO public."ProductSize" VALUES (1428, 29, 53, 0);
INSERT INTO public."ProductSize" VALUES (1429, 29, 54, 12);
INSERT INTO public."ProductSize" VALUES (1430, 29, 55, 13);
INSERT INTO public."ProductSize" VALUES (1431, 29, 56, 11);
INSERT INTO public."ProductSize" VALUES (1432, 30, 38, 11);
INSERT INTO public."ProductSize" VALUES (1433, 30, 39, 0);
INSERT INTO public."ProductSize" VALUES (1434, 30, 40, 13);
INSERT INTO public."ProductSize" VALUES (1435, 30, 41, 12);
INSERT INTO public."ProductSize" VALUES (1436, 30, 42, 0);
INSERT INTO public."ProductSize" VALUES (1437, 30, 43, 11);
INSERT INTO public."ProductSize" VALUES (1438, 30, 44, 13);
INSERT INTO public."ProductSize" VALUES (1439, 30, 45, 0);
INSERT INTO public."ProductSize" VALUES (1440, 30, 46, 12);
INSERT INTO public."ProductSize" VALUES (1441, 30, 47, 11);
INSERT INTO public."ProductSize" VALUES (1442, 30, 48, 0);
INSERT INTO public."ProductSize" VALUES (1443, 30, 49, 13);
INSERT INTO public."ProductSize" VALUES (1444, 30, 50, 12);
INSERT INTO public."ProductSize" VALUES (1445, 30, 51, 0);
INSERT INTO public."ProductSize" VALUES (1446, 30, 52, 11);
INSERT INTO public."ProductSize" VALUES (1447, 30, 53, 13);
INSERT INTO public."ProductSize" VALUES (1448, 30, 54, 0);
INSERT INTO public."ProductSize" VALUES (1449, 30, 55, 12);
INSERT INTO public."ProductSize" VALUES (1450, 30, 56, 11);
INSERT INTO public."ProductSize" VALUES (1451, 31, 38, 0);
INSERT INTO public."ProductSize" VALUES (1452, 31, 39, 12);
INSERT INTO public."ProductSize" VALUES (1453, 31, 40, 13);
INSERT INTO public."ProductSize" VALUES (1454, 31, 41, 0);
INSERT INTO public."ProductSize" VALUES (1455, 31, 42, 11);
INSERT INTO public."ProductSize" VALUES (1456, 31, 43, 12);
INSERT INTO public."ProductSize" VALUES (1457, 31, 44, 0);
INSERT INTO public."ProductSize" VALUES (1458, 31, 45, 13);
INSERT INTO public."ProductSize" VALUES (1459, 31, 46, 11);
INSERT INTO public."ProductSize" VALUES (1460, 31, 47, 0);
INSERT INTO public."ProductSize" VALUES (1461, 31, 48, 12);
INSERT INTO public."ProductSize" VALUES (1462, 31, 49, 13);
INSERT INTO public."ProductSize" VALUES (1463, 31, 50, 0);
INSERT INTO public."ProductSize" VALUES (1464, 31, 51, 12);
INSERT INTO public."ProductSize" VALUES (1465, 31, 52, 11);
INSERT INTO public."ProductSize" VALUES (1466, 31, 53, 0);
INSERT INTO public."ProductSize" VALUES (1467, 31, 54, 13);
INSERT INTO public."ProductSize" VALUES (1468, 31, 55, 12);
INSERT INTO public."ProductSize" VALUES (1469, 31, 56, 11);
INSERT INTO public."ProductSize" VALUES (1470, 32, 38, 13);
INSERT INTO public."ProductSize" VALUES (1471, 32, 39, 0);
INSERT INTO public."ProductSize" VALUES (1472, 32, 40, 12);
INSERT INTO public."ProductSize" VALUES (1473, 32, 41, 11);
INSERT INTO public."ProductSize" VALUES (1474, 32, 42, 0);
INSERT INTO public."ProductSize" VALUES (1475, 32, 43, 13);
INSERT INTO public."ProductSize" VALUES (1476, 32, 44, 12);
INSERT INTO public."ProductSize" VALUES (1477, 32, 45, 0);
INSERT INTO public."ProductSize" VALUES (1478, 32, 46, 11);
INSERT INTO public."ProductSize" VALUES (1479, 32, 47, 13);
INSERT INTO public."ProductSize" VALUES (1480, 32, 48, 0);
INSERT INTO public."ProductSize" VALUES (1481, 32, 49, 12);
INSERT INTO public."ProductSize" VALUES (1482, 32, 50, 11);
INSERT INTO public."ProductSize" VALUES (1483, 32, 51, 0);
INSERT INTO public."ProductSize" VALUES (1484, 32, 52, 13);
INSERT INTO public."ProductSize" VALUES (1485, 32, 53, 12);
INSERT INTO public."ProductSize" VALUES (1486, 32, 54, 0);
INSERT INTO public."ProductSize" VALUES (1487, 32, 55, 11);
INSERT INTO public."ProductSize" VALUES (1488, 32, 56, 13);
INSERT INTO public."ProductSize" VALUES (1489, 33, 38, 0);
INSERT INTO public."ProductSize" VALUES (1490, 33, 39, 11);
INSERT INTO public."ProductSize" VALUES (1491, 33, 40, 13);
INSERT INTO public."ProductSize" VALUES (1492, 33, 41, 0);
INSERT INTO public."ProductSize" VALUES (1493, 33, 42, 12);
INSERT INTO public."ProductSize" VALUES (1494, 33, 43, 11);
INSERT INTO public."ProductSize" VALUES (1495, 33, 44, 0);
INSERT INTO public."ProductSize" VALUES (1496, 33, 45, 13);
INSERT INTO public."ProductSize" VALUES (1497, 33, 46, 12);
INSERT INTO public."ProductSize" VALUES (1498, 33, 47, 0);
INSERT INTO public."ProductSize" VALUES (1499, 33, 48, 11);
INSERT INTO public."ProductSize" VALUES (1500, 33, 49, 13);
INSERT INTO public."ProductSize" VALUES (1501, 33, 50, 0);
INSERT INTO public."ProductSize" VALUES (1502, 33, 51, 12);
INSERT INTO public."ProductSize" VALUES (1503, 33, 52, 11);
INSERT INTO public."ProductSize" VALUES (1504, 33, 53, 0);
INSERT INTO public."ProductSize" VALUES (1505, 33, 54, 13);
INSERT INTO public."ProductSize" VALUES (1506, 33, 55, 12);
INSERT INTO public."ProductSize" VALUES (1507, 33, 56, 11);
INSERT INTO public."ProductSize" VALUES (1508, 34, 38, 12);
INSERT INTO public."ProductSize" VALUES (1509, 34, 39, 0);
INSERT INTO public."ProductSize" VALUES (1510, 34, 40, 13);
INSERT INTO public."ProductSize" VALUES (1511, 34, 41, 11);
INSERT INTO public."ProductSize" VALUES (1512, 34, 42, 0);
INSERT INTO public."ProductSize" VALUES (1513, 34, 43, 12);
INSERT INTO public."ProductSize" VALUES (1514, 34, 44, 13);
INSERT INTO public."ProductSize" VALUES (1515, 34, 45, 0);
INSERT INTO public."ProductSize" VALUES (1516, 34, 46, 11);
INSERT INTO public."ProductSize" VALUES (1517, 34, 47, 12);
INSERT INTO public."ProductSize" VALUES (1518, 34, 48, 0);
INSERT INTO public."ProductSize" VALUES (1519, 34, 49, 13);
INSERT INTO public."ProductSize" VALUES (1520, 34, 50, 11);
INSERT INTO public."ProductSize" VALUES (1521, 34, 51, 0);
INSERT INTO public."ProductSize" VALUES (1522, 34, 52, 12);
INSERT INTO public."ProductSize" VALUES (1523, 34, 53, 13);
INSERT INTO public."ProductSize" VALUES (1524, 34, 54, 0);
INSERT INTO public."ProductSize" VALUES (1525, 34, 55, 11);
INSERT INTO public."ProductSize" VALUES (1526, 34, 56, 12);
INSERT INTO public."ProductSize" VALUES (1527, 35, 38, 0);
INSERT INTO public."ProductSize" VALUES (1528, 35, 39, 13);
INSERT INTO public."ProductSize" VALUES (1529, 35, 40, 12);
INSERT INTO public."ProductSize" VALUES (1530, 35, 41, 0);
INSERT INTO public."ProductSize" VALUES (1531, 35, 42, 11);
INSERT INTO public."ProductSize" VALUES (1532, 35, 43, 13);
INSERT INTO public."ProductSize" VALUES (1533, 35, 44, 0);
INSERT INTO public."ProductSize" VALUES (1534, 35, 45, 12);
INSERT INTO public."ProductSize" VALUES (1535, 35, 46, 11);
INSERT INTO public."ProductSize" VALUES (1536, 35, 47, 0);
INSERT INTO public."ProductSize" VALUES (1537, 35, 48, 13);
INSERT INTO public."ProductSize" VALUES (1538, 35, 49, 12);
INSERT INTO public."ProductSize" VALUES (1539, 35, 50, 0);
INSERT INTO public."ProductSize" VALUES (1540, 35, 51, 11);
INSERT INTO public."ProductSize" VALUES (1541, 35, 52, 13);
INSERT INTO public."ProductSize" VALUES (1542, 35, 53, 0);
INSERT INTO public."ProductSize" VALUES (1543, 35, 54, 12);
INSERT INTO public."ProductSize" VALUES (1544, 35, 55, 13);
INSERT INTO public."ProductSize" VALUES (1545, 35, 56, 11);
INSERT INTO public."ProductSize" VALUES (1546, 36, 38, 11);
INSERT INTO public."ProductSize" VALUES (1547, 36, 39, 0);
INSERT INTO public."ProductSize" VALUES (1548, 36, 40, 13);
INSERT INTO public."ProductSize" VALUES (1549, 36, 41, 12);
INSERT INTO public."ProductSize" VALUES (1550, 36, 42, 0);
INSERT INTO public."ProductSize" VALUES (1551, 36, 43, 11);
INSERT INTO public."ProductSize" VALUES (1552, 36, 44, 13);
INSERT INTO public."ProductSize" VALUES (1553, 36, 45, 0);
INSERT INTO public."ProductSize" VALUES (1554, 36, 46, 12);
INSERT INTO public."ProductSize" VALUES (1555, 36, 47, 11);
INSERT INTO public."ProductSize" VALUES (1556, 36, 48, 0);
INSERT INTO public."ProductSize" VALUES (1557, 36, 49, 13);
INSERT INTO public."ProductSize" VALUES (1558, 36, 50, 12);
INSERT INTO public."ProductSize" VALUES (1559, 36, 51, 0);
INSERT INTO public."ProductSize" VALUES (1560, 36, 52, 11);
INSERT INTO public."ProductSize" VALUES (1561, 36, 53, 13);
INSERT INTO public."ProductSize" VALUES (1562, 36, 54, 0);
INSERT INTO public."ProductSize" VALUES (1563, 36, 55, 12);
INSERT INTO public."ProductSize" VALUES (1564, 36, 56, 11);
INSERT INTO public."ProductSize" VALUES (1565, 37, 38, 0);
INSERT INTO public."ProductSize" VALUES (1566, 37, 39, 11);
INSERT INTO public."ProductSize" VALUES (1567, 37, 40, 13);
INSERT INTO public."ProductSize" VALUES (1568, 37, 41, 0);
INSERT INTO public."ProductSize" VALUES (1569, 37, 42, 12);
INSERT INTO public."ProductSize" VALUES (1570, 37, 43, 11);
INSERT INTO public."ProductSize" VALUES (1571, 37, 44, 0);
INSERT INTO public."ProductSize" VALUES (1572, 37, 45, 13);
INSERT INTO public."ProductSize" VALUES (1573, 37, 46, 12);
INSERT INTO public."ProductSize" VALUES (1574, 37, 47, 0);
INSERT INTO public."ProductSize" VALUES (1575, 37, 48, 11);
INSERT INTO public."ProductSize" VALUES (1576, 37, 49, 13);
INSERT INTO public."ProductSize" VALUES (1577, 37, 50, 0);
INSERT INTO public."ProductSize" VALUES (1578, 37, 51, 12);
INSERT INTO public."ProductSize" VALUES (1579, 37, 52, 11);
INSERT INTO public."ProductSize" VALUES (1580, 37, 53, 0);
INSERT INTO public."ProductSize" VALUES (1581, 37, 54, 13);
INSERT INTO public."ProductSize" VALUES (1582, 37, 55, 12);
INSERT INTO public."ProductSize" VALUES (1583, 37, 56, 11);
INSERT INTO public."ProductSize" VALUES (1584, 38, 38, 11);
INSERT INTO public."ProductSize" VALUES (1585, 38, 39, 0);
INSERT INTO public."ProductSize" VALUES (1586, 38, 40, 13);
INSERT INTO public."ProductSize" VALUES (1587, 38, 41, 12);
INSERT INTO public."ProductSize" VALUES (1588, 38, 42, 0);
INSERT INTO public."ProductSize" VALUES (1589, 38, 43, 11);
INSERT INTO public."ProductSize" VALUES (1590, 38, 44, 13);
INSERT INTO public."ProductSize" VALUES (1591, 38, 45, 0);
INSERT INTO public."ProductSize" VALUES (1592, 38, 46, 12);
INSERT INTO public."ProductSize" VALUES (1593, 38, 47, 11);
INSERT INTO public."ProductSize" VALUES (1594, 38, 48, 0);
INSERT INTO public."ProductSize" VALUES (1595, 38, 49, 13);
INSERT INTO public."ProductSize" VALUES (1596, 38, 50, 12);
INSERT INTO public."ProductSize" VALUES (1597, 38, 51, 0);
INSERT INTO public."ProductSize" VALUES (1598, 38, 52, 11);
INSERT INTO public."ProductSize" VALUES (1599, 38, 53, 13);
INSERT INTO public."ProductSize" VALUES (1600, 38, 54, 0);
INSERT INTO public."ProductSize" VALUES (1601, 38, 55, 12);
INSERT INTO public."ProductSize" VALUES (1602, 38, 56, 11);
INSERT INTO public."ProductSize" VALUES (1603, 39, 38, 0);
INSERT INTO public."ProductSize" VALUES (1604, 39, 39, 11);
INSERT INTO public."ProductSize" VALUES (1605, 39, 40, 13);
INSERT INTO public."ProductSize" VALUES (1606, 39, 41, 0);
INSERT INTO public."ProductSize" VALUES (1607, 39, 42, 12);
INSERT INTO public."ProductSize" VALUES (1608, 39, 43, 11);
INSERT INTO public."ProductSize" VALUES (1609, 39, 44, 0);
INSERT INTO public."ProductSize" VALUES (1610, 39, 45, 13);
INSERT INTO public."ProductSize" VALUES (1611, 39, 46, 12);
INSERT INTO public."ProductSize" VALUES (1612, 39, 47, 0);
INSERT INTO public."ProductSize" VALUES (1613, 39, 48, 11);
INSERT INTO public."ProductSize" VALUES (1614, 39, 49, 13);
INSERT INTO public."ProductSize" VALUES (1615, 39, 50, 0);
INSERT INTO public."ProductSize" VALUES (1616, 39, 51, 12);
INSERT INTO public."ProductSize" VALUES (1617, 39, 52, 11);
INSERT INTO public."ProductSize" VALUES (1618, 39, 53, 0);
INSERT INTO public."ProductSize" VALUES (1619, 39, 54, 13);
INSERT INTO public."ProductSize" VALUES (1620, 39, 55, 12);
INSERT INTO public."ProductSize" VALUES (1621, 39, 56, 11);
INSERT INTO public."ProductSize" VALUES (1622, 40, 38, 11);
INSERT INTO public."ProductSize" VALUES (1623, 40, 39, 0);
INSERT INTO public."ProductSize" VALUES (1624, 40, 40, 13);
INSERT INTO public."ProductSize" VALUES (1625, 40, 41, 12);
INSERT INTO public."ProductSize" VALUES (1626, 40, 42, 0);
INSERT INTO public."ProductSize" VALUES (1627, 40, 43, 11);
INSERT INTO public."ProductSize" VALUES (1628, 40, 44, 13);
INSERT INTO public."ProductSize" VALUES (1629, 40, 45, 0);
INSERT INTO public."ProductSize" VALUES (1630, 40, 46, 12);
INSERT INTO public."ProductSize" VALUES (1631, 40, 47, 11);
INSERT INTO public."ProductSize" VALUES (1632, 40, 48, 0);
INSERT INTO public."ProductSize" VALUES (1633, 40, 49, 13);
INSERT INTO public."ProductSize" VALUES (1634, 40, 50, 12);
INSERT INTO public."ProductSize" VALUES (1635, 40, 51, 0);
INSERT INTO public."ProductSize" VALUES (1636, 40, 52, 11);
INSERT INTO public."ProductSize" VALUES (1637, 40, 53, 13);
INSERT INTO public."ProductSize" VALUES (1638, 40, 54, 0);
INSERT INTO public."ProductSize" VALUES (1639, 40, 55, 12);
INSERT INTO public."ProductSize" VALUES (1640, 40, 56, 11);
INSERT INTO public."ProductSize" VALUES (1641, 41, 38, 0);
INSERT INTO public."ProductSize" VALUES (1642, 41, 39, 12);
INSERT INTO public."ProductSize" VALUES (1643, 41, 40, 13);
INSERT INTO public."ProductSize" VALUES (1644, 41, 41, 0);
INSERT INTO public."ProductSize" VALUES (1645, 41, 42, 11);
INSERT INTO public."ProductSize" VALUES (1646, 41, 43, 12);
INSERT INTO public."ProductSize" VALUES (1647, 41, 44, 0);
INSERT INTO public."ProductSize" VALUES (1648, 41, 45, 13);
INSERT INTO public."ProductSize" VALUES (1649, 41, 46, 11);
INSERT INTO public."ProductSize" VALUES (1650, 41, 47, 0);
INSERT INTO public."ProductSize" VALUES (1651, 41, 48, 12);
INSERT INTO public."ProductSize" VALUES (1652, 41, 49, 13);
INSERT INTO public."ProductSize" VALUES (1653, 41, 50, 0);
INSERT INTO public."ProductSize" VALUES (1654, 41, 51, 11);
INSERT INTO public."ProductSize" VALUES (1655, 41, 52, 12);
INSERT INTO public."ProductSize" VALUES (1656, 41, 53, 0);
INSERT INTO public."ProductSize" VALUES (1657, 41, 54, 13);
INSERT INTO public."ProductSize" VALUES (1658, 41, 55, 11);
INSERT INTO public."ProductSize" VALUES (1659, 41, 56, 12);
INSERT INTO public."ProductSize" VALUES (1660, 42, 38, 13);
INSERT INTO public."ProductSize" VALUES (1661, 42, 39, 0);
INSERT INTO public."ProductSize" VALUES (1662, 42, 40, 12);
INSERT INTO public."ProductSize" VALUES (1663, 42, 41, 11);
INSERT INTO public."ProductSize" VALUES (1664, 42, 42, 0);
INSERT INTO public."ProductSize" VALUES (1665, 42, 43, 13);
INSERT INTO public."ProductSize" VALUES (1666, 42, 44, 12);
INSERT INTO public."ProductSize" VALUES (1667, 42, 45, 0);
INSERT INTO public."ProductSize" VALUES (1668, 42, 46, 11);
INSERT INTO public."ProductSize" VALUES (1669, 42, 47, 13);
INSERT INTO public."ProductSize" VALUES (1670, 42, 48, 0);
INSERT INTO public."ProductSize" VALUES (1671, 42, 49, 12);
INSERT INTO public."ProductSize" VALUES (1672, 42, 50, 11);
INSERT INTO public."ProductSize" VALUES (1673, 42, 51, 0);
INSERT INTO public."ProductSize" VALUES (1674, 42, 52, 13);
INSERT INTO public."ProductSize" VALUES (1675, 42, 53, 12);
INSERT INTO public."ProductSize" VALUES (1676, 42, 54, 0);
INSERT INTO public."ProductSize" VALUES (1677, 42, 55, 11);
INSERT INTO public."ProductSize" VALUES (1678, 42, 56, 13);
INSERT INTO public."ProductSize" VALUES (1679, 43, 38, 0);
INSERT INTO public."ProductSize" VALUES (1680, 43, 39, 11);
INSERT INTO public."ProductSize" VALUES (1681, 43, 40, 13);
INSERT INTO public."ProductSize" VALUES (1682, 43, 41, 0);
INSERT INTO public."ProductSize" VALUES (1683, 43, 42, 12);
INSERT INTO public."ProductSize" VALUES (1684, 43, 43, 11);
INSERT INTO public."ProductSize" VALUES (1685, 43, 44, 0);
INSERT INTO public."ProductSize" VALUES (1686, 43, 45, 13);
INSERT INTO public."ProductSize" VALUES (1687, 43, 46, 12);
INSERT INTO public."ProductSize" VALUES (1688, 43, 47, 0);
INSERT INTO public."ProductSize" VALUES (1689, 43, 48, 11);
INSERT INTO public."ProductSize" VALUES (1690, 43, 49, 13);
INSERT INTO public."ProductSize" VALUES (1691, 43, 50, 0);
INSERT INTO public."ProductSize" VALUES (1692, 43, 51, 12);
INSERT INTO public."ProductSize" VALUES (1693, 43, 52, 11);
INSERT INTO public."ProductSize" VALUES (1694, 43, 53, 0);
INSERT INTO public."ProductSize" VALUES (1695, 43, 54, 13);
INSERT INTO public."ProductSize" VALUES (1696, 43, 55, 12);
INSERT INTO public."ProductSize" VALUES (1697, 43, 56, 11);
INSERT INTO public."ProductSize" VALUES (1698, 44, 38, 12);
INSERT INTO public."ProductSize" VALUES (1699, 44, 39, 0);
INSERT INTO public."ProductSize" VALUES (1700, 44, 40, 13);
INSERT INTO public."ProductSize" VALUES (1701, 44, 41, 11);
INSERT INTO public."ProductSize" VALUES (1702, 44, 42, 0);
INSERT INTO public."ProductSize" VALUES (1703, 44, 43, 12);
INSERT INTO public."ProductSize" VALUES (1704, 44, 44, 13);
INSERT INTO public."ProductSize" VALUES (1705, 44, 45, 0);
INSERT INTO public."ProductSize" VALUES (1706, 44, 46, 11);
INSERT INTO public."ProductSize" VALUES (1707, 44, 47, 12);
INSERT INTO public."ProductSize" VALUES (1708, 44, 48, 0);
INSERT INTO public."ProductSize" VALUES (1709, 44, 49, 13);
INSERT INTO public."ProductSize" VALUES (1710, 44, 50, 11);
INSERT INTO public."ProductSize" VALUES (1711, 44, 51, 0);
INSERT INTO public."ProductSize" VALUES (1712, 44, 52, 12);
INSERT INTO public."ProductSize" VALUES (1713, 44, 53, 13);
INSERT INTO public."ProductSize" VALUES (1714, 44, 54, 0);
INSERT INTO public."ProductSize" VALUES (1715, 44, 55, 11);
INSERT INTO public."ProductSize" VALUES (1716, 44, 56, 12);
INSERT INTO public."ProductSize" VALUES (1717, 45, 38, 0);
INSERT INTO public."ProductSize" VALUES (1718, 45, 39, 13);
INSERT INTO public."ProductSize" VALUES (1719, 45, 40, 12);
INSERT INTO public."ProductSize" VALUES (1720, 45, 41, 0);
INSERT INTO public."ProductSize" VALUES (1721, 45, 42, 11);
INSERT INTO public."ProductSize" VALUES (1722, 45, 43, 13);
INSERT INTO public."ProductSize" VALUES (1723, 45, 44, 0);
INSERT INTO public."ProductSize" VALUES (1724, 45, 45, 12);
INSERT INTO public."ProductSize" VALUES (1725, 45, 46, 11);
INSERT INTO public."ProductSize" VALUES (1726, 45, 47, 0);
INSERT INTO public."ProductSize" VALUES (1727, 45, 48, 13);
INSERT INTO public."ProductSize" VALUES (1728, 45, 49, 12);
INSERT INTO public."ProductSize" VALUES (1729, 45, 50, 0);
INSERT INTO public."ProductSize" VALUES (1730, 45, 51, 11);
INSERT INTO public."ProductSize" VALUES (1731, 45, 52, 13);
INSERT INTO public."ProductSize" VALUES (1732, 45, 53, 0);
INSERT INTO public."ProductSize" VALUES (1733, 45, 54, 12);
INSERT INTO public."ProductSize" VALUES (1734, 45, 55, 13);
INSERT INTO public."ProductSize" VALUES (1735, 45, 56, 11);
INSERT INTO public."ProductSize" VALUES (1736, 46, 38, 11);
INSERT INTO public."ProductSize" VALUES (1737, 46, 39, 0);
INSERT INTO public."ProductSize" VALUES (1738, 46, 40, 13);
INSERT INTO public."ProductSize" VALUES (1739, 46, 41, 12);
INSERT INTO public."ProductSize" VALUES (1740, 46, 42, 0);
INSERT INTO public."ProductSize" VALUES (1741, 46, 43, 11);
INSERT INTO public."ProductSize" VALUES (1742, 46, 44, 13);
INSERT INTO public."ProductSize" VALUES (1743, 46, 45, 0);
INSERT INTO public."ProductSize" VALUES (1744, 46, 46, 12);
INSERT INTO public."ProductSize" VALUES (1745, 46, 47, 11);
INSERT INTO public."ProductSize" VALUES (1746, 46, 48, 0);
INSERT INTO public."ProductSize" VALUES (1747, 46, 49, 13);
INSERT INTO public."ProductSize" VALUES (1748, 46, 50, 12);
INSERT INTO public."ProductSize" VALUES (1749, 46, 51, 0);
INSERT INTO public."ProductSize" VALUES (1750, 46, 52, 11);
INSERT INTO public."ProductSize" VALUES (1751, 46, 53, 13);
INSERT INTO public."ProductSize" VALUES (1752, 46, 54, 0);
INSERT INTO public."ProductSize" VALUES (1753, 46, 55, 12);
INSERT INTO public."ProductSize" VALUES (1754, 46, 56, 11);
INSERT INTO public."ProductSize" VALUES (1755, 47, 38, 0);
INSERT INTO public."ProductSize" VALUES (1756, 47, 39, 12);
INSERT INTO public."ProductSize" VALUES (1757, 47, 40, 13);
INSERT INTO public."ProductSize" VALUES (1758, 47, 41, 0);
INSERT INTO public."ProductSize" VALUES (1759, 47, 42, 11);
INSERT INTO public."ProductSize" VALUES (1760, 47, 43, 12);
INSERT INTO public."ProductSize" VALUES (1761, 47, 44, 0);
INSERT INTO public."ProductSize" VALUES (1762, 47, 45, 13);
INSERT INTO public."ProductSize" VALUES (1763, 47, 46, 11);
INSERT INTO public."ProductSize" VALUES (1764, 47, 47, 0);
INSERT INTO public."ProductSize" VALUES (1765, 47, 48, 12);
INSERT INTO public."ProductSize" VALUES (1766, 47, 49, 13);
INSERT INTO public."ProductSize" VALUES (1767, 47, 50, 0);
INSERT INTO public."ProductSize" VALUES (1768, 47, 51, 11);
INSERT INTO public."ProductSize" VALUES (1769, 47, 52, 12);
INSERT INTO public."ProductSize" VALUES (1770, 47, 53, 0);
INSERT INTO public."ProductSize" VALUES (1771, 47, 54, 13);
INSERT INTO public."ProductSize" VALUES (1772, 47, 55, 11);
INSERT INTO public."ProductSize" VALUES (1773, 47, 56, 12);
INSERT INTO public."ProductSize" VALUES (1774, 48, 38, 13);
INSERT INTO public."ProductSize" VALUES (1775, 48, 39, 0);
INSERT INTO public."ProductSize" VALUES (1776, 48, 40, 12);
INSERT INTO public."ProductSize" VALUES (1777, 48, 41, 11);
INSERT INTO public."ProductSize" VALUES (1778, 48, 42, 0);
INSERT INTO public."ProductSize" VALUES (1779, 48, 43, 13);
INSERT INTO public."ProductSize" VALUES (1780, 48, 44, 12);
INSERT INTO public."ProductSize" VALUES (1781, 48, 45, 0);
INSERT INTO public."ProductSize" VALUES (1782, 48, 46, 11);
INSERT INTO public."ProductSize" VALUES (1783, 48, 47, 13);
INSERT INTO public."ProductSize" VALUES (1784, 48, 48, 0);
INSERT INTO public."ProductSize" VALUES (1785, 48, 49, 12);
INSERT INTO public."ProductSize" VALUES (1786, 48, 50, 11);
INSERT INTO public."ProductSize" VALUES (1787, 48, 51, 0);
INSERT INTO public."ProductSize" VALUES (1788, 48, 52, 13);
INSERT INTO public."ProductSize" VALUES (1789, 48, 53, 12);
INSERT INTO public."ProductSize" VALUES (1790, 48, 54, 0);
INSERT INTO public."ProductSize" VALUES (1791, 48, 55, 11);
INSERT INTO public."ProductSize" VALUES (1792, 48, 56, 13);


--
-- TOC entry 3950 (class 0 OID 17912)
-- Dependencies: 221
-- Data for Name: Session; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3964 (class 0 OID 18026)
-- Dependencies: 235
-- Data for Name: Size; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Size" VALUES (1, '19', 'KIDS');
INSERT INTO public."Size" VALUES (2, '20', 'KIDS');
INSERT INTO public."Size" VALUES (3, '21', 'KIDS');
INSERT INTO public."Size" VALUES (4, '22', 'KIDS');
INSERT INTO public."Size" VALUES (5, '23', 'KIDS');
INSERT INTO public."Size" VALUES (6, '24', 'KIDS');
INSERT INTO public."Size" VALUES (7, '25', 'KIDS');
INSERT INTO public."Size" VALUES (8, '26', 'KIDS');
INSERT INTO public."Size" VALUES (9, '27', 'KIDS');
INSERT INTO public."Size" VALUES (10, '28', 'KIDS');
INSERT INTO public."Size" VALUES (11, '29', 'KIDS');
INSERT INTO public."Size" VALUES (12, '30', 'KIDS');
INSERT INTO public."Size" VALUES (13, '31', 'KIDS');
INSERT INTO public."Size" VALUES (14, '32', 'KIDS');
INSERT INTO public."Size" VALUES (15, '33', 'KIDS');
INSERT INTO public."Size" VALUES (16, '34', 'KIDS');
INSERT INTO public."Size" VALUES (17, '35', 'KIDS');
INSERT INTO public."Size" VALUES (18, '36', 'KIDS');
INSERT INTO public."Size" VALUES (19, '37', 'KIDS');
INSERT INTO public."Size" VALUES (20, '38', 'KIDS');
INSERT INTO public."Size" VALUES (21, '35', 'WOMEN');
INSERT INTO public."Size" VALUES (22, '35.5', 'WOMEN');
INSERT INTO public."Size" VALUES (23, '36', 'WOMEN');
INSERT INTO public."Size" VALUES (24, '36.5', 'WOMEN');
INSERT INTO public."Size" VALUES (25, '37', 'WOMEN');
INSERT INTO public."Size" VALUES (26, '37.5', 'WOMEN');
INSERT INTO public."Size" VALUES (27, '38', 'WOMEN');
INSERT INTO public."Size" VALUES (28, '38.5', 'WOMEN');
INSERT INTO public."Size" VALUES (29, '39', 'WOMEN');
INSERT INTO public."Size" VALUES (30, '39.5', 'WOMEN');
INSERT INTO public."Size" VALUES (31, '40', 'WOMEN');
INSERT INTO public."Size" VALUES (32, '40.5', 'WOMEN');
INSERT INTO public."Size" VALUES (33, '41', 'WOMEN');
INSERT INTO public."Size" VALUES (34, '41.5', 'WOMEN');
INSERT INTO public."Size" VALUES (35, '42', 'WOMEN');
INSERT INTO public."Size" VALUES (36, '42.5', 'WOMEN');
INSERT INTO public."Size" VALUES (37, '43', 'WOMEN');
INSERT INTO public."Size" VALUES (38, '39', 'MEN');
INSERT INTO public."Size" VALUES (39, '39.5', 'MEN');
INSERT INTO public."Size" VALUES (40, '40', 'MEN');
INSERT INTO public."Size" VALUES (41, '40.5', 'MEN');
INSERT INTO public."Size" VALUES (42, '41', 'MEN');
INSERT INTO public."Size" VALUES (43, '41.5', 'MEN');
INSERT INTO public."Size" VALUES (44, '42', 'MEN');
INSERT INTO public."Size" VALUES (45, '42.5', 'MEN');
INSERT INTO public."Size" VALUES (46, '43', 'MEN');
INSERT INTO public."Size" VALUES (47, '43.5', 'MEN');
INSERT INTO public."Size" VALUES (48, '44', 'MEN');
INSERT INTO public."Size" VALUES (49, '44.5', 'MEN');
INSERT INTO public."Size" VALUES (50, '45', 'MEN');
INSERT INTO public."Size" VALUES (51, '45.5', 'MEN');
INSERT INTO public."Size" VALUES (52, '46', 'MEN');
INSERT INTO public."Size" VALUES (53, '46.5', 'MEN');
INSERT INTO public."Size" VALUES (54, '47', 'MEN');
INSERT INTO public."Size" VALUES (55, '47.5', 'MEN');
INSERT INTO public."Size" VALUES (56, '48', 'MEN');


--
-- TOC entry 3952 (class 0 OID 17936)
-- Dependencies: 223
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."User" VALUES ('0CC5CJLPBF8hhaNGtxxR6Kgr0XAA4V4f', 'Danny Emma', 'emmadanny91@gmail.com', true, NULL, '2026-05-07 10:53:19.6', '2026-05-07 10:53:47.738');


--
-- TOC entry 3951 (class 0 OID 17925)
-- Dependencies: 222
-- Data for Name: Verification; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3948 (class 0 OID 17843)
-- Dependencies: 219
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public._prisma_migrations VALUES ('f6c7aa08-d9bc-480e-9ab9-8c7fa6c9db08', 'f04f6986d23aeaed897dced85643be9dc33cdb4521cdb9cee3154a1de0b7ec63', '2026-05-06 10:52:52.857631+04', '20260506065252_reinitialization', NULL, NULL, '2026-05-06 10:52:52.814068+04', 1);


--
-- TOC entry 3985 (class 0 OID 0)
-- Dependencies: 224
-- Name: Address_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Address_id_seq"', 3, true);


--
-- TOC entry 3986 (class 0 OID 0)
-- Dependencies: 230
-- Name: Brand_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Brand_id_seq"', 1, false);


--
-- TOC entry 3987 (class 0 OID 0)
-- Dependencies: 232
-- Name: ColorFilter_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ColorFilter_id_seq"', 1, false);


--
-- TOC entry 3988 (class 0 OID 0)
-- Dependencies: 226
-- Name: Destination_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Destination_id_seq"', 1, false);


--
-- TOC entry 3989 (class 0 OID 0)
-- Dependencies: 240
-- Name: OrderItem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."OrderItem_id_seq"', 1, false);


--
-- TOC entry 3990 (class 0 OID 0)
-- Dependencies: 238
-- Name: Order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Order_id_seq"', 1, false);


--
-- TOC entry 3991 (class 0 OID 0)
-- Dependencies: 236
-- Name: ProductSize_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ProductSize_id_seq"', 1, false);


--
-- TOC entry 3992 (class 0 OID 0)
-- Dependencies: 228
-- Name: Product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Product_id_seq"', 1, false);


--
-- TOC entry 3993 (class 0 OID 0)
-- Dependencies: 234
-- Name: Size_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Size_id_seq"', 1, false);


--
-- TOC entry 3761 (class 2606 OID 17911)
-- Name: Account Account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (id);


--
-- TOC entry 3771 (class 2606 OID 17967)
-- Name: Address Address_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_pkey" PRIMARY KEY (id);


--
-- TOC entry 3777 (class 2606 OID 18012)
-- Name: Brand Brand_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Brand"
    ADD CONSTRAINT "Brand_pkey" PRIMARY KEY (id);


--
-- TOC entry 3779 (class 2606 OID 18024)
-- Name: ColorFilter ColorFilter_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ColorFilter"
    ADD CONSTRAINT "ColorFilter_pkey" PRIMARY KEY (id);


--
-- TOC entry 3773 (class 2606 OID 17981)
-- Name: Destination Destination_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Destination"
    ADD CONSTRAINT "Destination_pkey" PRIMARY KEY (id);


--
-- TOC entry 3788 (class 2606 OID 18077)
-- Name: OrderItem OrderItem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_pkey" PRIMARY KEY (id);


--
-- TOC entry 3785 (class 2606 OID 18064)
-- Name: Order Order_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (id);


--
-- TOC entry 3783 (class 2606 OID 18047)
-- Name: ProductSize ProductSize_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductSize"
    ADD CONSTRAINT "ProductSize_pkey" PRIMARY KEY (id);


--
-- TOC entry 3775 (class 2606 OID 18001)
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- TOC entry 3763 (class 2606 OID 17924)
-- Name: Session Session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_pkey" PRIMARY KEY (id);


--
-- TOC entry 3781 (class 2606 OID 18036)
-- Name: Size Size_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Size"
    ADD CONSTRAINT "Size_pkey" PRIMARY KEY (id);


--
-- TOC entry 3769 (class 2606 OID 17948)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- TOC entry 3766 (class 2606 OID 17935)
-- Name: Verification Verification_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Verification"
    ADD CONSTRAINT "Verification_pkey" PRIMARY KEY (id);


--
-- TOC entry 3759 (class 2606 OID 17856)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 3786 (class 1259 OID 18080)
-- Name: Order_stripeSessionId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Order_stripeSessionId_key" ON public."Order" USING btree ("stripeSessionId");


--
-- TOC entry 3764 (class 1259 OID 18078)
-- Name: Session_token_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Session_token_key" ON public."Session" USING btree (token);


--
-- TOC entry 3767 (class 1259 OID 18079)
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- TOC entry 3789 (class 2606 OID 18081)
-- Name: Account Account_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3791 (class 2606 OID 18091)
-- Name: Address Address_destinationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES public."Destination"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3792 (class 2606 OID 18096)
-- Name: Address Address_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3798 (class 2606 OID 18126)
-- Name: OrderItem OrderItem_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Order"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3799 (class 2606 OID 18136)
-- Name: OrderItem OrderItem_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3800 (class 2606 OID 18131)
-- Name: OrderItem OrderItem_sizeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES public."Size"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3797 (class 2606 OID 18121)
-- Name: Order Order_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3795 (class 2606 OID 18111)
-- Name: ProductSize ProductSize_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductSize"
    ADD CONSTRAINT "ProductSize_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3796 (class 2606 OID 18116)
-- Name: ProductSize ProductSize_sizeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductSize"
    ADD CONSTRAINT "ProductSize_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES public."Size"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3793 (class 2606 OID 18106)
-- Name: Product Product_brandId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES public."Brand"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3794 (class 2606 OID 18101)
-- Name: Product Product_colorFilterId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_colorFilterId_fkey" FOREIGN KEY ("colorFilterId") REFERENCES public."ColorFilter"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3790 (class 2606 OID 18086)
-- Name: Session Session_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2026-05-08 10:33:59 +04

--
-- PostgreSQL database dump complete
--

\unrestrict wBhZh8PHfWQGtvT1cPRy7xdbiT9fTpa90Fik6fqfcg8cMu4ALg3xtp0CA27f1oW

