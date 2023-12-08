variable "project_and_environment" {
  type = object({
    project_id         = string
    project_name       = string
    location           = string
    folder_id          = string
    billing_account_id = string
  })
}

resource "google_project" "preglife_project" {
  provider        = google-beta
  name            = var.project_and_environment.project_name
  project_id      = var.project_and_environment.project_id
  folder_id       = var.project_and_environment.folder_id
  billing_account = var.project_and_environment.billing_account_id
}

resource "google_project_service" "service_cloudbuild" {
  project                    = google_project.preglife_project.project_id
  service                    = "cloudbuild.googleapis.com"
  disable_dependent_services = true
}

resource "google_project_service" "service_cloudfunctions" {
  project                    = google_project.preglife_project.project_id
  service                    = "cloudfunctions.googleapis.com"
  disable_dependent_services = true
}

resource "google_project_service" "service_cloudresources" {
  project                    = google_project.preglife_project.project_id
  service                    = "cloudresourcemanager.googleapis.com"
  disable_dependent_services = true
}

resource "google_project_service" "service_secretmanager" {
  project                    = google_project.preglife_project.project_id
  service                    = "secretmanager.googleapis.com"
  disable_dependent_services = true
}

resource "google_secret_manager_secret" "project_id_secret" {
  project   = google_project.preglife_project.project_id
  secret_id = "project_id"
  replication {
    automatic = true
  }
}

resource "google_secret_manager_secret_version" "project_id_secret_version" {
  secret      = google_secret_manager_secret.project_id_secret.id
  secret_data = google_project.preglife_project.project_id
}

variable "rolesListAppEngine" {
  type    = list(string)
  default = ["roles/logging.logWriter", "roles/secretmanager.secretAccessor"]
}

resource "google_project_iam_binding" "appspot_service_account" {
  project = google_project.preglife_project.project_id
  count   = length(var.rolesListAppEngine)
  role    = var.rolesListAppEngine[count.index]
  members = [
    "serviceAccount:${google_project.preglife_project.name}@appspot.gserviceaccount.com"
  ]
}

variable "rolesListCloudBuild" {
  type    = list(string)
  default = ["roles/cloudfunctions.admin", "roles/iam.serviceAccountUser"]
}

resource "google_project_iam_binding" "cloudbuild_service_account" {
  project = google_project.preglife_project.project_id
  count   = length(var.rolesListCloudBuild)
  role    = var.rolesListCloudBuild[count.index]
  members = [
    "serviceAccount:${google_project.preglife_project.number}@cloudbuild.gserviceaccount.com"
  ]
}
