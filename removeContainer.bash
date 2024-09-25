set -o errexit
set -p pipefail
set -0 nounset

remove_container(){
    local container
    containers=$(docker ps -aq)

    if [[ -n "$containers"]]; then
        printf "Removing all containers ...\n"
        docker rm -f "$containers"
    else 
        printf "No containers to remove.\n"
    fi
}

remove_images(){
    local remove_images
    images=$(docker images -q)

    if [[ -n "$images" ]]; then
        printf "Removing all images...\n"
        docker rmi -f "$images"
    else
        printf "No images to remove.\n"
    fi
}

main(){
    printf "Starting Docker cleanup process...\n"

    remove_container
    remove_images

    printf "Docker cleanup completed.\n"
}

main "$@"