data "google_billing_account" "acct" {
  display_name = "Preglife (Devoteam)"
  open         = true
}

module "environment_stage" {
  source = "./../../project_setup"
  project_and_environment = {
    project_id         = "preglife-template-cloud-stage"
    project_name       = "preglife-template-cloud-stage"
    location           = "europe-west3"
    folder_id          = 981058503695
    billing_account_id = data.google_billing_account.acct.id
  }
}
