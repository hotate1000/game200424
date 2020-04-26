Rails.application.routes.draw do
  root 'games#index'
  resource:games do
    collection do
      get "runninggame"
      get "blockbreaking"
    end
  end
end
