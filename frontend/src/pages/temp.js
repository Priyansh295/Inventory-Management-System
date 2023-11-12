<div className={isClient ? 'form' : 'admin-form'}>
    <form  onSubmit={handleSubmit}>
        <label>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <br />
        <label>
            Password:
            <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button type="submit">Login</button>
    </form>
    <p>Don't have an account? <a href="#">Register Now.</a></p>
</div>
