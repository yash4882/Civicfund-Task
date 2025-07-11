Rails.application.routes.draw do
  devise_for :users

  authenticated :user do
    root 'allocations#index', as: :authenticated_root
  end

  root 'home#index'

  resources :allocations, only: [:index, :create] do
    collection do
      get 'confirm'
    end
  end

  namespace :admin do
    resources :projects, only: [:index]
  end
end
