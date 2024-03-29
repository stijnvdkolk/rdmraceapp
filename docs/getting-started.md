# Getting Started

## Prerequisites
* [Git](https://git-scm.com/)
* [Visual Studio Code](https://code.visualstudio.com/)
* If you are on Windows, install [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10)
  * Steps to install WSL 2:
    * Execute the following command in a Powershell windows with Administrator privileges:
      ```pwsh
      dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
      ```
    * Reboot your PC
    * Download the [WSL2 Kernel Update](https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi)
    * Run the installer.
      > When prompted for elevated permissions, click yes.
    * Setup WSL2 as default with the following command: `wsl --set-default-version 2`, make sure to install Ubuntu 20.04 after this command is executed.
* [Docker](https://www.docker.com/)
  * **Windows**: [Docker for Windows](https://docs.docker.com/desktop/windows/install/) (select the **`WSL 2 Backend`** option)
  * **macOS**: [Docker for Mac](https://docs.docker.com/desktop/mac/install/)
  * **Linux**: [Docker CE/EE](https://docs.docker.com/install/#supported-platforms) 18.06+ and [Docker Compose](https://docs.docker.com/compose/install) 1.21+. (The Ubuntu snap package is not supported.)

> Extra step for **Windows** users:
> Please install [Ubuntu 20.04 LTS](https://www.microsoft.com/en-us/p/ubuntu-2004-lts/9n6svws3rx71) **after** WSL 2 is installed.

> After installation, open **Docker Desktop**, open **Settings**.
> Then select **Resources**, **WSL Integration** and **Enable** the **Enable integration with my default WSL distro** checkbox and enable the checkbox after **Ubuntu-20.04**.

## Installation
1. Clone this repository to your local machine using git.
1. Open a command prompt and navigate to the root of the repository.
1. Please open this repo in Visual Studio Code using `code .` in the command prompt.
1. Make sure to install the following extensions (they should also be in the recommended list):
    * [ESLint](vscode:extension/dbaeumer.vscode-eslint)
    * [npm](vscode:extension/eg2.vscode-npm-script)
    * [npm Intellisense](vscode:extension/christian-kohler.npm-intellisense)
    * [Prettier](vscode:extension/esbenp.prettier-vscode)
    * [Visual Studio IntelliCode](vscode:extension/visualstudioexptteam.vscodeintellicode)
    * [Docker](vscode:extension/ms-azuretools.vscode-docker)
    * [Remote WSL](vscode:extension/ms-vscode-remote.remote-wsl)
1. Click on the "Remote icon" in the bottom left corner of the editor.
![Remote icon](./remote-icon.png)

1. Select "Reopen Folder in WSL" from the context menu that pops up.
    > Make sure to always open the project in WSL before working on it.
1. Install all dependencies for both the `frontend` and `backend` folders with the `yarn` command.

## Running the application
* Use `make dev` to start the development environment.
* Use `make build-dev` to build the development environment.
  > WARNING: `make build-dev` will automatically build all images in parallel. For low-end systems, or systems with troublesome heat dissipation, such as laptops, we recommend using `make build-dev-noparallel` in order to prevent overheating or crashing.
* Use `make down` do stop the development environment.
