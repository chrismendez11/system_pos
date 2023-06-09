PGDMP     3    -                {         
   system_pos    12.14    12.14 '    9           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            :           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ;           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            <           1262    16401 
   system_pos    DATABASE     �   CREATE DATABASE system_pos WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Spanish_Guatemala.1252' LC_CTYPE = 'Spanish_Guatemala.1252';
    DROP DATABASE system_pos;
                postgres    false            �            1259    16405    SequelizeMeta    TABLE     R   CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);
 #   DROP TABLE public."SequelizeMeta";
       public         heap    postgres    false            �            1259    16451    payments    TABLE     �  CREATE TABLE public.payments (
    id integer NOT NULL,
    create_at timestamp with time zone NOT NULL,
    payday timestamp with time zone NOT NULL,
    document_number integer NOT NULL,
    supplier character varying(255) NOT NULL,
    bill_number integer NOT NULL,
    series integer NOT NULL,
    amount double precision NOT NULL,
    bill_date timestamp with time zone NOT NULL,
    description character varying(255) NOT NULL
);
    DROP TABLE public.payments;
       public         heap    postgres    false            �            1259    16449    payments_id_seq    SEQUENCE     �   CREATE SEQUENCE public.payments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.payments_id_seq;
       public          postgres    false    208            =           0    0    payments_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.payments_id_seq OWNED BY public.payments.id;
          public          postgres    false    207            �            1259    16440    supplier_movements    TABLE     [  CREATE TABLE public.supplier_movements (
    id integer NOT NULL,
    type_of_movement character varying(255) NOT NULL,
    document_number integer NOT NULL,
    supplier character varying(255) NOT NULL,
    concept character varying(255) NOT NULL,
    cost_center character varying(255) NOT NULL,
    type_of_expenditure character varying(255) NOT NULL,
    type_of_payment character varying(255) NOT NULL,
    credit_days integer NOT NULL,
    payday timestamp with time zone NOT NULL,
    create_at timestamp with time zone NOT NULL,
    series_document integer NOT NULL,
    gas boolean NOT NULL
);
 &   DROP TABLE public.supplier_movements;
       public         heap    postgres    false            �            1259    16438    supplier_movements_id_seq    SEQUENCE     �   CREATE SEQUENCE public.supplier_movements_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.supplier_movements_id_seq;
       public          postgres    false    206            >           0    0    supplier_movements_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.supplier_movements_id_seq OWNED BY public.supplier_movements.id;
          public          postgres    false    205            �            1259    16462 	   suppliers    TABLE     �  CREATE TABLE public.suppliers (
    id integer NOT NULL,
    company character varying(255) NOT NULL,
    address character varying(255) NOT NULL,
    phone integer NOT NULL,
    nit integer NOT NULL,
    email character varying(255) NOT NULL,
    interest_rate double precision NOT NULL,
    credit_days integer NOT NULL,
    ledger_account character varying(255) NOT NULL,
    create_at timestamp with time zone NOT NULL
);
    DROP TABLE public.suppliers;
       public         heap    postgres    false            �            1259    16460    suppliers_id_seq    SEQUENCE     �   CREATE SEQUENCE public.suppliers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.suppliers_id_seq;
       public          postgres    false    210            ?           0    0    suppliers_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.suppliers_id_seq OWNED BY public.suppliers.id;
          public          postgres    false    209            �            1259    16426    users    TABLE     ?  CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    username character varying(255) NOT NULL,
    role character varying(255) DEFAULT 'customer'::character varying NOT NULL,
    create_at timestamp with time zone NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16424    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    204            @           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    203            �
           2604    16454    payments id    DEFAULT     j   ALTER TABLE ONLY public.payments ALTER COLUMN id SET DEFAULT nextval('public.payments_id_seq'::regclass);
 :   ALTER TABLE public.payments ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    208    207    208            �
           2604    16443    supplier_movements id    DEFAULT     ~   ALTER TABLE ONLY public.supplier_movements ALTER COLUMN id SET DEFAULT nextval('public.supplier_movements_id_seq'::regclass);
 D   ALTER TABLE public.supplier_movements ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    206    205    206            �
           2604    16465    suppliers id    DEFAULT     l   ALTER TABLE ONLY public.suppliers ALTER COLUMN id SET DEFAULT nextval('public.suppliers_id_seq'::regclass);
 ;   ALTER TABLE public.suppliers ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    209    210    210            �
           2604    16429    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    204    203    204            .          0    16405    SequelizeMeta 
   TABLE DATA           /   COPY public."SequelizeMeta" (name) FROM stdin;
    public          postgres    false    202   b/       4          0    16451    payments 
   TABLE DATA           �   COPY public.payments (id, create_at, payday, document_number, supplier, bill_number, series, amount, bill_date, description) FROM stdin;
    public          postgres    false    208   �/       2          0    16440    supplier_movements 
   TABLE DATA           �   COPY public.supplier_movements (id, type_of_movement, document_number, supplier, concept, cost_center, type_of_expenditure, type_of_payment, credit_days, payday, create_at, series_document, gas) FROM stdin;
    public          postgres    false    206   ?0       6          0    16462 	   suppliers 
   TABLE DATA           �   COPY public.suppliers (id, company, address, phone, nit, email, interest_rate, credit_days, ledger_account, create_at) FROM stdin;
    public          postgres    false    210   �0       0          0    16426    users 
   TABLE DATA           O   COPY public.users (id, email, password, username, role, create_at) FROM stdin;
    public          postgres    false    204   }1       A           0    0    payments_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.payments_id_seq', 9, true);
          public          postgres    false    207            B           0    0    supplier_movements_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.supplier_movements_id_seq', 5, true);
          public          postgres    false    205            C           0    0    suppliers_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.suppliers_id_seq', 64, true);
          public          postgres    false    209            D           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 1, true);
          public          postgres    false    203            �
           2606    16409     SequelizeMeta SequelizeMeta_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);
 N   ALTER TABLE ONLY public."SequelizeMeta" DROP CONSTRAINT "SequelizeMeta_pkey";
       public            postgres    false    202            �
           2606    16459    payments payments_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.payments DROP CONSTRAINT payments_pkey;
       public            postgres    false    208            �
           2606    16448 *   supplier_movements supplier_movements_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.supplier_movements
    ADD CONSTRAINT supplier_movements_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.supplier_movements DROP CONSTRAINT supplier_movements_pkey;
       public            postgres    false    206            �
           2606    16472    suppliers suppliers_company_key 
   CONSTRAINT     ]   ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT suppliers_company_key UNIQUE (company);
 I   ALTER TABLE ONLY public.suppliers DROP CONSTRAINT suppliers_company_key;
       public            postgres    false    210            �
           2606    16476    suppliers suppliers_email_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT suppliers_email_key UNIQUE (email);
 G   ALTER TABLE ONLY public.suppliers DROP CONSTRAINT suppliers_email_key;
       public            postgres    false    210            �
           2606    16474    suppliers suppliers_nit_key 
   CONSTRAINT     U   ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT suppliers_nit_key UNIQUE (nit);
 E   ALTER TABLE ONLY public.suppliers DROP CONSTRAINT suppliers_nit_key;
       public            postgres    false    210            �
           2606    16470    suppliers suppliers_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT suppliers_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.suppliers DROP CONSTRAINT suppliers_pkey;
       public            postgres    false    210            �
           2606    16437    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    204            �
           2606    16435    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    204            .   U   x�M�K
�0 �}��$-�]�DR����.���,>R�Y1�R4ێ9U{��;��0�0�hV92�I�j������ �k      4   h   x�3�4202�50�54U0��22�21�3���50CHY���$l�雘쒟���RT�ihfljhfj�ij` �c��' �275�D!-�H���� '3��+F��� ��O      2   e   x�U�;� ��)� f!���x����`������K�e<�T�X�3�̭rK�[��!�s^�@���`�:M^���8���4�_vvx@V[��� F�j      6   �   x�M��
�0D�ۯ�hH��4�ɂ�ɓW/K�hZ0���e����e<.�L!���R�.�� �O���$���Ʋk=t�ul2�d<<��I�K�Ny������8Ǽ>��5 ijj͵a4�׮'���Z���!� ���rjȲb[J[�],��bV�8$�[�U��;પ�� ��?|      0   y   x�3�LL���sH�M���K���T1JR14Pq��s	��*��rM7�	O.�r��sqHN�����*��Ns+N�ruw�K�%���uLuM���,����,-u̸b���� c#�     