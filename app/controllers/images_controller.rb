require 'fileutils'

class ImagesController < ApplicationController
  def create
    render head: :no_content, status: 422 unless file = params[:file]
    name = SecureRandom.uuid
    extension = File.extname(file.original_filename)
    full_name = [name, extension].join("")
    base_path = Rails.root.join('public','uploads')
    FileUtils.mkdir_p(base_path)
    full_path = base_path.join(full_name)
    File.open(full_path, 'wb'){|f| f.write(file.read)}
    render json: {url: "/uploads/#{full_name}"}
  end
end
