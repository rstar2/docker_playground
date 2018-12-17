## Mounting volumes in Windows Docker Toolbox

1. Start Docker Quickstart Terminal

2. Create a container and mount a volume
https://stackoverflow.com/questions/34161352/docker-sharing-a-volume-on-windows-with-docker-toolbox

```
docker run -it --rm -v /c/Users/DockerVolume:/shared -p 80:80 -p 8080:8080  --name test ubuntu
```

 > If you are using Docker Machine on Mac or Windows, your Docker daemon has only limited access to your OS X or Windows filesystem. Docker Machine tries to auto-share your /Users (OS X) or C:\Users (Windows) directory.

 This is because in VirtualBox in "default" docker machine the "C:\Users" is shared as "c/Users",
 and to share a host directory absolute path should be used so "/c/Users"


So now the "C:\Users\DockerVolume" will be the shared folder


3. Another way is to configure the VirtualBox:
https://blog.shahinrostami.com/2017/11/docker-toolbox-windows-7-shared-volumes/

   1. Add the desired folders in "Shared Folders" of the docker-machine vbox - named "default" in VirtualBox
        Example - share "D:\" named as "d"
   2. Restart by ```docker-machine restart default```

   3. Now adding volumes like
   ```
   docker run -it --rm -v /d/DockerVolume:/shared --name test ubuntu
   ```
   will allow sharing data in "D:\DockerVolume"

4. In order the PWD env variable to work it must be set like this: ```$ set PWD=%cd%```
