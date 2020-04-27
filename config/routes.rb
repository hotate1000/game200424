Rails.application.routes.draw do
  root 'games#index'
  resource:games do
    collection do
      get "blockbreaking"
      get "runningman"
    end
  end
end
