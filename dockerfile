FROM debian:latest

RUN apt-get update && apt-get install -y \
    zsh \
    htop \
    sudo \
    git \
    && rm -rf /var/lib/apt/lists/*

RUN useradd -ms /bin/zsh archer && echo "archer:toor" | chpasswd && adduser archer sudo

RUN chsh -s /bin/zsh/ root

WORKDIR /home/archer

CMD [ "zsh" ]