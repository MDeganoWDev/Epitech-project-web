# T-WEB-501-TLS_1 - Job Board

Here is a simple fullstack web project using PostgreSQL, Django and React.

The website is a fully working job application plateform where companies and job seekers can get into contact.

If you want to run the project on your server follow those steps:

- You will need to make sure that you have at least npm (bun prefered) and Docker installed and configured on the machine.
To install bun:
```bash
curl -fsSL https://bun.sh/install | bash
```

To install Docker:
```
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done

```


- Then launch those commands in a shell environment:

```bash
cd ./back-end/
docker-compose up -d --build
./migrate.sh
```

Then you will start the front-end as dev mode:

```bash
cd ../front-end/
```
Then with bun:
```bash
bun i
bun run dev
```
or with npm:
```bash
npm i
npm run dev
```

From there you will have a running terminal with front-end and a background Docker job running database and api.
