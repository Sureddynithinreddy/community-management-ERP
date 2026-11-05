
pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
        timestamps()
    }

    environment {
        IMAGE_NAME = 'gated-community-erp'
        DOCKERHUB_USER = 'nithin0049'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code from GitHub'
                checkout scm
            }
        }

        stage('Build React Application & Docker Image') {
            steps {
                echo 'Building React application and Docker image'
                sh 'docker build -t ${DOCKERHUB_USER}/${IMAGE_NAME}:${BUILD_NUMBER} .'
            }
        }

        stage('Verify Docker Image') {
            steps {
                sh 'docker image inspect ${DOCKERHUB_USER}/${IMAGE_NAME}:${BUILD_NUMBER} > /dev/null'
                echo 'Docker image verified!'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_TOKEN'
                    )
                ]) {
                    sh '''
                        echo "$DOCKER_TOKEN" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push ${DOCKERHUB_USER}/${IMAGE_NAME}:${BUILD_NUMBER}
                        docker logout
                    '''
                }
            }
        }
    }

    post {
        always {
            sh 'docker logout || true'
        }

        success {
            echo 'CI Pipeline completed successfully!'
            echo 'Docker image pushed to Docker Hub!'
        }

        failure {
            echo 'Pipeline failed. Check the console output.'
        }
    }
}
