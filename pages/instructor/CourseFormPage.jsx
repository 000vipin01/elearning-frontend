import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { courseService } from '../../services/courseService';
import { categoryService } from '../../services/categoryService';
import { ArrowLeft, Save, Sparkles, Layers, Image as ImageIcon } from 'lucide-react';
import { Input, Select, TextArea } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export function CourseFormPage() {
  const { id } = useParams(); // If present, edit mode; otherwise, create mode
  const isEditMode = Boolean(id);

  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);

  // Form Fields
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('Software Engineering');
  const [difficulty, setDifficulty] = useState('Beginner');
  const [duration, setDuration] = useState('20 hours');
  const [thumbnail, setThumbnail] = useState('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80');
  const [tags, setTags] = useState('Java, Concurrency, Architecture');
  const [description, setDescription] = useState('');
  const [whatYouWillLearn, setWhatYouWillLearn] = useState('Master core architecture patterns\nImplement reliable system algorithms\nBuild production ready software services');
  const [requirements, setRequirements] = useState('Basic programming background\nComputer workstation with internet connection');
  const [published, setPublished] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        const catList = await categoryService.getCategories();
        setCategories(catList);

        if (isEditMode) {
          const course = await courseService.getCourseById(id);
          // Check ownership
          if (user.role === 'INSTRUCTOR' && course.instructorId !== user.id) {
            toast.error('You can only edit courses you authored.');
            navigate('/instructor/courses');
            return;
          }

          setTitle(course.title || '');
          setSubtitle(course.subtitle || '');
          setCategory(course.category || 'Software Engineering');
          setDifficulty(course.difficulty || 'Beginner');
          setDuration(course.duration || '20 hours');
          setThumbnail(course.thumbnail || '');
          setTags((course.tags || []).join(', '));
          setDescription(course.description || '');
          setWhatYouWillLearn((course.whatYouWillLearn || []).join('\n'));
          setRequirements((course.requirements || []).join('\n'));
          setPublished(Boolean(course.published));
        }
      } catch (err) {
        toast.error('Failed to load course details');
        navigate('/instructor/courses');
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [id, isEditMode, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Please enter a course title');
      return;
    }

    setSubmitting(true);
    try {
      const coursePayload = {
        title: title.trim(),
        subtitle: subtitle.trim(),
        category,
        difficulty,
        duration,
        thumbnail: thumbnail.trim(),
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        description: description.trim(),
        whatYouWillLearn: whatYouWillLearn.split('\n').map(s => s.trim()).filter(Boolean),
        requirements: requirements.split('\n').map(s => s.trim()).filter(Boolean),
        published
      };

      if (isEditMode) {
        await courseService.updateCourse(id, coursePayload, user);
        toast.success('Course details updated successfully!');
        navigate('/instructor/courses');
      } else {
        const created = await courseService.createCourse(coursePayload, user);
        toast.success(`Course "${created.title}" created successfully!`);
        // Navigate to the curriculum builder so the instructor can add modules and lessons immediately
        navigate(`/instructor/courses/${created.id}/builder`);
      }
    } catch (err) {
      toast.error(err.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-8 animate-pulse space-y-4">
        <div className="h-8 bg-slate-800 rounded w-1/3" />
        <div className="h-64 bg-slate-800/60 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-surface-border/60 pb-6">
        <div className="flex items-center gap-3">
          <Link
            to="/instructor/courses"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <Badge variant="amber" size="sm" className="mb-1">
              {isEditMode ? 'Course Editor' : 'Curriculum Authoring'}
            </Badge>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {isEditMode ? 'Edit Course Settings' : 'Create New Academic Course'}
            </h1>
          </div>
        </div>

        {isEditMode && (
          <Link to={`/instructor/courses/${id}/builder`}>
            <Button variant="secondary" size="sm" leftIcon={<Layers className="w-4 h-4" />}>
              Open Content Builder
            </Button>
          </Link>
        )}
      </div>

      {/* Main Form Card */}
      <form onSubmit={handleSubmit} className="bg-surface-card border border-surface-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="space-y-4">
          <Input
            label="Course Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Distributed Consensus & High Availability Systems"
            required
          />

          <Input
            label="Short Subtitle / Hook"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="e.g. Master the Raft consensus algorithm and Paxos invariants"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select
              label="Academic Discipline"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={categories.map(c => ({ label: c.name, value: c.name }))}
            />

            <Select
              label="Difficulty Level"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              options={[
                { label: 'Beginner', value: 'Beginner' },
                { label: 'Intermediate', value: 'Intermediate' },
                { label: 'Advanced', value: 'Advanced' }
              ]}
            />

            <Input
              label="Estimated Duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g. 24 hours"
            />
          </div>

          <Input
            label="Thumbnail Image URL"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            icon={<ImageIcon className="w-4 h-4" />}
          />

          <Input
            label="Tags (Comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. Java, Concurrency, Virtual Threads"
          />

          <TextArea
            label="Full Course Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Detailed course narrative explaining the curriculum scope, learning objectives, and industrial relevance..."
          />

          <TextArea
            label="What You'll Learn (1 point per line)"
            value={whatYouWillLearn}
            onChange={(e) => setWhatYouWillLearn(e.target.value)}
            rows={4}
          />

          <TextArea
            label="Prerequisites (1 point per line)"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            rows={3}
          />

          {/* Publication State */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-surface-border flex items-center justify-between">
            <div>
              <span className="text-sm font-bold text-white">Course Publication Status</span>
              <p className="text-xs text-slate-400">
                {published
                  ? 'Published courses are visible and open for student enrollment in catalog.'
                  : 'Draft courses are private to you while you assemble modules and lessons.'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500" />
            </label>
          </div>
        </div>

        <div className="pt-4 border-t border-surface-border/60 flex items-center justify-end gap-3">
          <Link to="/instructor/courses">
            <Button variant="secondary" size="md">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={submitting}
            leftIcon={<Save className="w-4 h-4" />}
          >
            {isEditMode ? 'Update Course' : 'Create & Open Curriculum Builder'}
          </Button>
        </div>
      </form>
    </div>
  );
}
