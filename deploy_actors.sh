#!/bin/bash

# Load environment variables from .env if present (safer than hard-coding secrets)
if [ -f .env ]; then
    # Export variables declared in .env (ignores commented lines)
    set -a
    . .env
    set +a
else
    echo "Warning: .env not found in repo root. Make sure OPENAI_API_KEY and APIFY_TOKEN are set in the environment."
fi

# Function to create actor configuration
create_actor_config() {
        local ACTOR_NAME=$1
        local MEMORY=$2
        local TIMEOUT=$3
    
        mkdir -p .actor
        cat > .actor/actor.json << EOL
{
        "actorSpecification": 1,
        "name": "${ACTOR_NAME}",
        "version": "0.1",
        "buildTag": "latest",
        "environmentVariables": {
                "OPENAI_API_KEY": "@OPENAI_API_KEY",
                "OPENAI_MODEL": "gpt-4.1-mini"
        },
        "options": {
                "build": "latest",
                "memoryMbytes": ${MEMORY},
                "timeoutSecs": ${TIMEOUT}
        }
}
EOL
}

# Deploy AEGIS Fairness Audit
cd veritas-fairness-audit || exit 1
create_actor_config "aegis-fairness-audit" 1024 300
apify push --force

# Deploy LYRA Reflection Intake
cd ../veritas-reflection-intake || exit 1
create_actor_config "lyra-reflection-intake" 1024 300
apify push --force

# Deploy VESTA Ritual Suggestor
cd ../veritas-ritual-suggestor || exit 1
create_actor_config "vesta-ritual-suggestor" 1024 300
apify push --force

# Deploy JUNO Tribunal
cd ../veritas-tribunal || exit 1
create_actor_config "juno-tribunal" 2048 300
apify push --force

# Print deployment completion message
echo "All actors deployed. Please visit Apify Console to verify and set up integrations."
