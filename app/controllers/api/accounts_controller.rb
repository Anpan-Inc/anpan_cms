class Api::AccountsController < ApplicationController
  def show
    @user = current_user
    @user.image.cache! unless @user.image.blank?
    render json: @user
  end

  def update
    @user = current_user
    if @user.update(account_params)
      render json: @user
    else
      error_message = @user.errors.join("\n")
      render json: error_message, status: 400
    end
  end

  private
  def account_params
    params.permit(:image, :name, :email, :description, :bank_account)
  end

  # TODO: 消す
  def current_user
    @account ||= Account.find_or_create_by(id: 1, email: 'hoge@example.com')
  end
end
