FROM ubuntu:16.04
MAINTAINER Pierre Carion <pcarion@gmail.com>
ENV VAULT_VERSION 0.10.4
RUN apt-get update \
  && apt-get install -y \
  build-essential \
  git \
  curl \
  wget \
  vim \
  net-tools \
  iputils-ping \
  dnsutils \
  zip \
  unzip \
  && wget -O /tmp/vault.zip "https://releases.hashicorp.com/vault/${VAULT_VERSION}/vault_${VAULT_VERSION}_linux_amd64.zip" \
  && unzip -d /bin /tmp/vault.zip \
  && chmod 755 /bin/vault \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*
VOLUME "/mnt/data"
CMD ["/bin/bash"]
