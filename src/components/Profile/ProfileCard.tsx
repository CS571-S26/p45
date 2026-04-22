import React, { useState } from "react";
import { useProfile } from "../../contexts/ProfileContext";
import "./ProfileCard.css";

interface FormState {
  feet: string;
  inches: string;
  weight: string;
  bodyFat: string;
}

const ProfileCard = () => {
  const { profile, setProfile } = useProfile();

  const [form, setForm] = useState<FormState>({
    feet: String(profile.feet ?? ""),
    inches: String(profile.inches ?? ""),
    weight: String(profile.weight ?? ""),
    bodyFat: String(profile.bodyFat ?? ""),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile({
      feet: form.feet === "" ? 0 : parseInt(form.feet),
      inches: form.inches === "" ? 0 : parseInt(form.inches),
      weight: form.weight === "" ? 0 : parseFloat(form.weight),
      bodyFat: form.bodyFat === "" ? 0 : parseFloat(form.bodyFat),
    });
  };

  const heightDisplay =
    profile.feet !== undefined && profile.inches !== undefined
      ? `${profile.feet}' ${profile.inches}"`
      : "—";

  const totalInches = (profile.feet || 0) * 12 + (profile.inches || 0);
  const bmi = totalInches > 0
    ? ((profile.weight || 0) / (totalInches * totalInches)) * 703
    : 0;

  const bmiDisplay = bmi > 0 ? bmi.toFixed(1) : "—";

  return (
    <div className="profile-card">
      <h2 className="profile-title">Profile</h2>

      <form className="profile-form" onSubmit={handleSubmit}>

        <div className="form-group height-group">
          <label>Height</label>
          <div className="height-inputs">
            <div className="height-field">
              <input
                name="feet"
                type="number"
                min="0"
                placeholder="ft"
                value={form.feet}
                onChange={handleChange}
              />
              <span className="height-unit">ft</span>
            </div>
            <div className="height-field">
              <input
                name="inches"
                type="number"
                min="0"
                max="11"
                placeholder="in"
                value={form.inches}
                onChange={handleChange}
              />
              <span className="height-unit">in</span>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Weight (lbs)</label>
          <input
            name="weight"
            type="number"
            min="0"
            value={form.weight}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Body Fat (%)</label>
          <input
            name="bodyFat"
            type="number"
            min="0"
            max="100"
            value={form.bodyFat}
            onChange={handleChange}
          />
        </div>

        <button className="profile-btn" type="submit">Save</button>
      </form>

      <div className="profile-stats">
        <h3>Current Stats</h3>
        <p>Height: {heightDisplay}</p>
        <p>Weight: {profile.weight ?? 0} lbs</p>
        <p>Body Fat: {profile.bodyFat ?? 0}%</p>
        <p>BMI: {bmiDisplay}</p>
      </div>
    </div>
  );
};

export default ProfileCard;