
pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
        timestamps()
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
                echo 'Installing dependencies and building React application'
                sh 'docker build -t gated-community-erp:${BUILD_NUMBER} .'
            }
        }

        stage('Verify Docker Image') {
            steps {
                sh 'docker image inspect gated-community-erp:${BUILD_NUMBER} > /dev/null'
                echo 'Docker image created successfully!'
            }
        }
    }

    post {
        success {
            echo 'CI Pipeline completed successfully!'
        }

        failure {
            echo 'CI Pipeline failed. Check the console output.'
        }
    }
}
