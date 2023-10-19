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
