class Api::UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy ]
  
  def index
    render json: User.all
  end

  def show
    render json: @user
  end

  def update
    if current_user.update(user_params)
      render json: current_user
    else
      render json: current_user.errors, status: 422
    end
  end

  def destroy
    @user.destroy
  end

  def all_user_events
    render json: User.all_user_events
  end
 
  def specific_user_events  
    render json: User.specific_user_events(params[:specificuserid])
  end
  
  def specific_user_events  
    render json: User.specific_user_events(params[:specificuserid])
  end

  private
    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:name, :image, :nickname)
    end
end
