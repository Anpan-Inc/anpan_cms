Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resource :accounts, only: [:show]

  namespace :api do
    resource :accounts, only: [:update, :show]
  end
end
