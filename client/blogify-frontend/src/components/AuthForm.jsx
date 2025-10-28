const AuthForm = ({ type, onSubmit, formData, setFormData }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {type === "signup" && (
        <input
          type="text"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          className="w-full p-2 border rounded"
        />
      )}
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        {type === "signup" ? "Create Account" : "Login"}
      </button>
    </form>
  );
};

export default AuthForm;
