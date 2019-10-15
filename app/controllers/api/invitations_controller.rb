class Api::InvitationsController < ApplicationController
  before_action :set_user, except: [:create_invitation, :destroy]
  before_action :set_event, except: [:create_invitation]
  before_action :set_invitation, only: [:show, :update, :destroy]

  def index
    render json: Invitation.all
  end

  def show
    render json: @invitation
  end

  def create
    invitation = @user.invitations.new(invitation_params)
    if invitation.save
      render json: invitation
    else
      render json: invitation.errors, status: 422
    end
  end

  def update
    if @invitation.update(invitation_params)
      render json: @invitation
    else
      render json: @invitation.errors, status: 422
    end
  end

  def destroy
    @invitation.destroy
  end

  private
    def set_invitation
      @invitation = Invitation.find(params[:id])
    end

    def set_user
      @user = User.find(params[:user_id])
    end

    def set_event
      @event = Event.find(params[:event_id])
    end

    def invitation_params
      params.require(:invitation).permit(:accepted, :organizer, :user_id, :event_id)
    end
end
