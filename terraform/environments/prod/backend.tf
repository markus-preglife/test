terraform {
  backend "gcs" {
    bucket = "preglife-tf-state"
    prefix = "template-cloud/prod"
  }
}
