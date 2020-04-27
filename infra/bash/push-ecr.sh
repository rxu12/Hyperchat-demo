# TODO this is dangerous, for safety this needs to be stash the credentials in a credential repository e.g vault
eval $(aws ecr get-login --no-include-email --region ap-southeast-2 | sed 's|https://||')
docker-compose --project-name hypper-chat -f ../docker-compose/app.yaml -f ../docker-compose/ecr.yaml push