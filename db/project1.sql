CREATE TABLE IF NOT EXISTS public."Users"
(
    id integer NOT NULL,
    email character varying(200),
    password character varying(225),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."Reflections"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 100 ),
    success boolean NOT NULL,
    low_point integer NOT NULL,
    take_away integer NOT NULL,
    "UsersId" integer NOT NULL,
    "createdAt" date NOT NULL,
    "updatedAt" date NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public."Reflections"
    ADD CONSTRAINT "UserId" FOREIGN KEY ("UsersId")
    REFERENCES public."Users" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

END;