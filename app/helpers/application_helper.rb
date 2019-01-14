module ApplicationHelper

  def submitDate(value)
    "#{value}"
    strftime("%Y／%m／%d %H：%M")
  end

end
