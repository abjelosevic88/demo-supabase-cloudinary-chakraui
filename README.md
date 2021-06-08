# Supabase + Cloudinary + Chakra UI

<div align="center">
	<a href="https://github.com/supabase/supabase">
		<img width="300" src="https://raw.githubusercontent.com/supabase/supabase/master/web/static/supabase-light-rounded-corner-background.svg"/>
	</a>
	&nbsp &nbsp
	<a href="https://github.com/cloudinary/cloudinary_js">
		<img width="100" src="https://avatars.githubusercontent.com/u/1460763?s=200&v=4"/>
	</a>
	&nbsp &nbsp
	<a href="https://github.com/chakra-ui/chakra-ui">
	    <img src="https://raw.githubusercontent.com/chakra-ui/chakra-ui/main/logo/logo-colored@2x.png?raw=true" alt="Chakra logo" width="300" />
    </a>
</div>


# Overview

This project is the composition of serverless services. All services have free starter packs ideal for small startup project or for some proof of concept ideas.

Services:

 - [supabase](https://github.com/supabase/supabase) is used as a main database (super cool service using PostgreSQL and easly configurable API)
 - [cloudinary](https://github.com/cloudinary/cloudinary_js) is used as file storage (mainly used as image storage since FREE plan have **25 GB** of storage)
 - [Chakra UI](https://github.com/chakra-ui/chakra-ui) is used as frontend styling library (personaly favorite library for frontend development)
 - Redis as caching service (connection can be configured inside environment file)

## Running locally

Configure the settings in the `.env` file:

```bash
# copy example template
cp .env.example .env
```

## Developing

Once you've installed dependencies with `npm install` (or `yarn`), start a development server:

```bash
npm run dev
```