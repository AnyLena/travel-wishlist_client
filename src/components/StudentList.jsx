const StudentList = ({students}) => {
  return (
    <section className="student-section">
      <h2>Student List</h2>
      <div className="student-container">
        {students
          ? students.map((student) => (
              <div key={student._id} className="student-item">
                <h3>
                  {student.name}, {student.first_name}
                </h3>{" "}
                <p>E-Mail Adress: {student.email}</p>
                <p>Country: {student.country.name}</p>
              </div>
            ))
          : null}
      </div>
    </section>
  );
};

export default StudentList;
