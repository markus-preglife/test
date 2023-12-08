data "google_billing_account" "acct" {
  display_name = "Preglife (Devoteam)"
  open         = true
}

module "environment_prod" {
  source = "./../../project_setup"
  project_and_environment = {
    project_id         = "preglife-template-cloud-prod"
    project_name       = "preglife-template-cloud-prod"
    location           = "europe-west3"
    folder_id          = 1234
    billing_account_id = data.google_billing_account.acct.id
  }
}
