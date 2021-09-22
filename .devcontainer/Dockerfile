# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.192.0/containers/typescript-node/.devcontainer/base.Dockerfile

# [Choice] Node.js version: 16, 14, 12
ARG VARIANT="16-buster"
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-${VARIANT}

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>

# RUN apt-get update \
#   && apt-get -y install --no-install-recommends apt-transport-https ca-certificates curl gnupg2 software-properties-common

# RUN curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -

# RUN add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable"

# RUN apt-get update

# # RUN curl -O https://download.docker.com/linux/ubuntu/dists/bionic/pool/edge/amd64/containerd.io_1.2.2-3_amd64.deb

# # RUN apt-get -y install ./containerd.io_1.2.2-3_amd64.deb

# RUN apt-get -y install docker-ce

# RUN curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# RUN chmod +x /usr/local/bin/docker-compose

RUN apt-get update \
  && apt-get install -y apt-transport-https ca-certificates curl gnupg2 lsb-release \
  && curl -fsSL https://download.docker.com/linux/$(lsb_release -is | tr '[:upper:]' '[:lower:]')/gpg | apt-key add - 2>/dev/null \
  && echo "deb [arch=amd64] https://download.docker.com/linux/$(lsb_release -is | tr '[:upper:]' '[:lower:]') $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list \
  && apt-get update \
  && apt-get install -y docker-ce-cli

RUN LATEST_COMPOSE_VERSION=$(curl -sSL "https://api.github.com/repos/docker/compose/releases/latest" | grep -o -P '(?<="tag_name": ").+(?=")') \
  && curl -sSL "https://github.com/docker/compose/releases/download/${LATEST_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose \
  && chmod +x /usr/local/bin/docker-compose


ARG NONROOT_USER=node

RUN touch /var/run/docker-host.sock \
  && ln -s /var/run/docker-host.sock /var/run/docker.sock \
  && apt-get update \
  && apt-get -y install socat

RUN echo "#!/bin/sh\n\
  sudoIf() { if [ \"\$(id -u)\" -ne 0 ]; then sudo \"\$@\"; else \"\$@\"; fi }\n\
  sudoIf rm -rf /var/run/docker.sock\n\
  ((sudoIf socat UNIX-LISTEN:/var/run/docker.sock,fork,mode=660,user=${NONROOT_USER} UNIX-CONNECT:/var/run/docker-host.sock) 2>&1 >> /tmp/vscr-docker-from-docker.log) & > /dev/null\n\
  \"\$@\"" >> /usr/local/share/docker-init.sh \
  && chmod +x /usr/local/share/docker-init.sh

# VS Code overrides ENTRYPOINT and CMD when executing `docker run` by default.
# Setting the ENTRYPOINT to docker-init.sh will configure non-root access to
# the Docker socket if "overrideCommand": false is set in devcontainer.json.
# The script will also execute CMD if you need to alter startup behaviors.
ENTRYPOINT [ "/usr/local/share/docker-init.sh" ]
CMD [ "sleep", "infinity" ]
