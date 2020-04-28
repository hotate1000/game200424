Rails.application.routes.draw do
  root 'games#index'
  resource:games do
    collection do
      get "blockbreaking"
      get "runningame"
    end
  end
end
