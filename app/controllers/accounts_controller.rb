class AccountsController < ApplicationController
  def show
  end

  private

  # TODO: 消す
  def current_user
    @account ||= Account.find_or_create_by(id: 1, email: 'hoge@example.com')
  end
end