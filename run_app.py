import subprocess
from pathlib import Path

if __name__ == "__main__":
    root_folder: str = Path(__file__).parent.absolute()
    python_interpreter: str = f"{root_folder}/env/bin/python"
    angular_app_folder: str = f"{root_folder}/app/dist/app/browser"
    django_app_folder: str = f"{root_folder}/api"
    angular_app_port: str = "58001"
    django_app_port: str = "58000"

    subprocess.Popen(
        [
            python_interpreter,
            "-m",
            "http.server",
            "--directory",
            angular_app_folder,
            "-b",
            "127.0.0.1",
            angular_app_port,
        ],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    subprocess.Popen(
        [
            "gunicorn",
            "api.wsgi",
            "-b",
            f"127.0.0.1:{django_app_port}",
        ],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        cwd=django_app_folder,
    )
    print(f"aplicativo iniciado em 127.0.0.1:{angular_app_port}...")
