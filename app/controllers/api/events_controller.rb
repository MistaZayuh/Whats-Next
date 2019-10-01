class Api::EventsController < ApplicationController
  before_action :set_event, only: [:show, :update, :destroy]
  def index
    render json: Event.all
  end

  def show
    render json: @event
  end

  def create
    event = Event.new(event_params)
    if event.save
      render json: event
    else
      render json: event.errors, status: 422
    end
  end

  def update
    if @event.save(event_params)
      render json: @event
    else
      render json: @event.errors, status: 422
    end
  end

  def destroy
    @event.destroy
  end

  private
    def set_event
      @event = Event.find(params[:id])
    end

    def event_params
      params.require(:event).permit(:name, :description, :location, :date, :image, :open, :max_attendees)
    end
end
