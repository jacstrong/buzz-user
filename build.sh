echo "${STAGE}"

if [[ -v STAGE ]]; then
    echo "Stage is set"
    echo "Building store for stage."
    npx vue-cli-service build --mode stage
else
    echo "Building store for production."
    npx vue-cli-service build
fi
