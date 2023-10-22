# T-WEB-501-TLS_1 - Job Board

Here is a simple fullstack web project using PostgreSQL, Django and React.

The website is a fully working job application plateform where companies and job seekers can get into contact.

For the front end we used React and typescript for the main architecture. We used bun as compiler. For the styling we use tailwind librairy and some shadecn/ui radix-ui components.

  - React typescript: https://react.dev/learn/typescript
  - Bun : https://bun.sh/
  - Tailwind: https://tailwindcss.com/
  - CSS components: https://ui.shadcn.com/ - https://www.radix-ui.com/primitives/docs/overview/introduction

To handle the back-end side of things we used Django python and its main rest framework Django Rest Framework. We have set up a PostgreSQL database handled entierely by Django and our custom preferences. 
All the back-end run on Docker dontainers.

  - Django : https://www.djangoproject.com/
  - DRF : https://www.django-rest-framework.org/
  - Postgres : https://www.postgresql.org/
  - Docker : https://docs.docker.com/




# RUN THE PROJECT

If you want to run the project on your server follow those steps:

- You will need to make sure that you have at least npm (bun prefered) and Docker installed and configured on the machine.
To install bun:
```bash
curl -fsSL https://bun.sh/install | bash
```

To install Docker:
```bash
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done

sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Add the repository to Apt sources:
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

```


- Then launch those commands in a shell environment:

```bash
cd ./back-end/
docker-compose up -d --build
```

Then you can use our script to run Django migration and fixtures:

```bash
./migrate.sh
```
***Nb: An admin user will be created with default username 'admin@admin.org' and password 'admin'.***

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
