# frozen_string_literal: true

# == Schema Information
#
# Table name: course_wiki_timeslices
#
#  id                   :bigint           not null, primary key
#  start                :datetime
#  end                  :datetime
#  last_mw_rev_id       :integer
#  character_sum        :integer          default(0)
#  references_count     :integer          default(0)
#  revision_count       :integer          default(0)
#  upload_count         :integer          default(0)
#  uploads_in_use_count :integer          default(0)
#  upload_usages_count  :integer          default(0)
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  course_id            :integer          not null
#  wiki_id              :integer          not null
#  last_mw_rev_datetime :datetime
#  needs_update         :boolean          default(FALSE)
#  stats                :text(65535)
#

FactoryBot.define do
  factory :course_wiki_timeslice, class: 'CourseWikiTimeslice' do
    nil
  end
end
