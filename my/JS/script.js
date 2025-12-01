// Quiz elements array to store all elements
let quizElements = [];
        let quizInfo = null;
        let quizInfoTopics = [];
        let questionTopics = [];
        let questionOptions = [];
        let optionType = "text"; // "text" or "image"
        let answerType = "text"; // "text" or "image"
        let answerImageData = null;

        // DOM elements
        const tabs = document.querySelectorAll(".tab");
        const tabContents = document.querySelectorAll(".tab-content");
        const elementList = document.getElementById("element-list");
        const previewContent = document.getElementById("preview-content");
        const questionTypeSelect = document.getElementById("question-type");
        const optionsContainer = document.getElementById("options-container");
        const textOptionsList = document.getElementById("text-options-list");
        const imageOptionsList = document.getElementById("image-options-list");
        const mediaTypeSelect = document.getElementById("media-type");
        const imageUploadGroup = document.getElementById("image-upload-group");
        const youtubeUrlGroup = document.getElementById("youtube-url-group");
        const imagePreview = document.getElementById("image-preview");
        const imageUpload = document.getElementById("image-upload");
        const explanationText = document.getElementById("explanation-text");
        const explanationPreview = document.getElementById("explanation-preview");
        const topicsList = document.getElementById("topics-list");
        const questionTopicsList = document.getElementById("question-topics-list");
        const formatButtons = document.querySelectorAll(".format-btn");
        const quizInfoBanner = document.getElementById("quiz-info-banner");
        const bannerQuizName = document.getElementById("banner-quiz-name");
        const bannerCourse = document.getElementById("banner-course");
        const bannerQuizTime = document.getElementById("banner-quiz-time");
        const bannerQuizTopics = document.getElementById("banner-quiz-topics");
        const saveQuizInfoBtn = document.getElementById("save-quiz-info");
        const editQuizInfoBtn = document.getElementById("edit-quiz-info");
        const mediaCaptionInput = document.getElementById("media-caption");
        const optionTypeBtns = document.querySelectorAll(".option-type-btn");
        const answerTypeBtns = document.querySelectorAll(".answer-type-btn");
        const answerImageUpload = document.getElementById("answer-image-upload");
        const answerImagePreview = document.getElementById("answer-image-preview");

        // Tab switching functionality
        tabs.forEach(tab => {
            tab.addEventListener("click", () => {
                const tabId = tab.getAttribute("data-tab");

                // Update active tab
                tabs.forEach(t => t.classList.remove("active"));
                tab.classList.add("active");

                // Update active tab content
                tabContents.forEach(content => {
                    content.classList.remove("active");
                    if (content.id === `${tabId}-tab`) {
                        content.classList.add("active");
                    }
                });
            });
        });

        // Question type change handler
        questionTypeSelect.addEventListener("change", function () {
            const questionType = this.value;

            if (questionType === "multiple-choice") {
                optionsContainer.style.display = "block";
                // Initialize with two empty options
                if (questionOptions.length === 0) {
                    if (optionType === "text") {
                        addTextOption();
                        addTextOption();
                    } else {
                        // For image options, we'll start with an empty array
                        questionOptions = [];
                    }
                }
            } else if (questionType === "true-false") {
                optionsContainer.style.display = "none";
                // Auto-set options for true/false
                questionOptions = ["True", "False"];
                updateOptionsList();
            } else {
                optionsContainer.style.display = "none";
                questionOptions = [];
            }
        });

        // Option type selection
        optionTypeBtns.forEach(btn => {
            btn.addEventListener("click", function() {
                const selectedType = this.getAttribute("data-option-type");
                
                // Update active button
                optionTypeBtns.forEach(b => b.classList.remove("active"));
                this.classList.add("active");
                
                // Update option type
                optionType = selectedType;
                
                // Show/hide appropriate option lists and buttons
                if (selectedType === "text") {
                    textOptionsList.style.display = "block";
                    imageOptionsList.style.display = "none";
                    document.getElementById("add-text-option").style.display = "block";
                    document.getElementById("add-image-option").style.display = "none";
                    
                    // Reset question options for text
                    questionOptions = [];
                    updateTextOptionsList();
                    
                    // Add two default options
                    addTextOption();
                    addTextOption();
                } else {
                    textOptionsList.style.display = "none";
                    imageOptionsList.style.display = "block";
                    document.getElementById("add-text-option").style.display = "none";
                    document.getElementById("add-image-option").style.display = "block";
                    
                    // Reset question options for images
                    questionOptions = [];
                    updateImageOptionsList();
                }
            });
        });

        // Answer type selection
        answerTypeBtns.forEach(btn => {
            btn.addEventListener("click", function() {
                const selectedType = this.getAttribute("data-answer-type");
                
                // Update active button
                answerTypeBtns.forEach(b => b.classList.remove("active"));
                this.classList.add("active");
                
                // Update answer type
                answerType = selectedType;
                
                // Show/hide appropriate answer input
                if (selectedType === "text") {
                    document.getElementById("text-answer-container").style.display = "block";
                    document.getElementById("image-answer-container").style.display = "none";
                } else {
                    document.getElementById("text-answer-container").style.display = "none";
                    document.getElementById("image-answer-container").style.display = "block";
                    answerImageData = null;
                }
            });
        });

        // Add text option for multiple choice
        document.getElementById("add-text-option").addEventListener("click", addTextOption);

        function addTextOption() {
            questionOptions.push({ type: "text", content: "" });
            updateTextOptionsList();
        }

        function removeTextOption(index) {
            questionOptions.splice(index, 1);
            updateTextOptionsList();
        }

        function updateTextOptionValue(index, value) {
            questionOptions[index].content = value;
        }

        function updateTextOptionsList() {
            textOptionsList.innerHTML = "";
            questionOptions.forEach((option, index) => {
                if (option.type === "text") {
                    const optionItem = document.createElement("div");
                    optionItem.className = "option-item";
                    optionItem.innerHTML = `
                        <input type="text" value="${option.content}" placeholder="Option ${
                            index + 1
                        }" onchange="updateTextOptionValue(${index}, this.value)">
                        <div class="remove-option" onclick="removeTextOption(${index})">
                            <i class="fas fa-times"></i>
                        </div>
                    `;
                    textOptionsList.appendChild(optionItem);
                }
            });
        }

        // Add image option for multiple choice
        document.getElementById("add-image-option").addEventListener("click", addImageOption);

        function addImageOption() {
            const optionId = Date.now();
            questionOptions.push({ type: "image", id: optionId, content: "" });
            updateImageOptionsList();
        }

        function removeImageOption(id) {
            questionOptions = questionOptions.filter(option => option.id !== id);
            updateImageOptionsList();
        }

        function updateImageOptionValue(id, value) {
            const option = questionOptions.find(opt => opt.id === id);
            if (option) {
                option.content = value;
            }
        }

        function updateImageOptionsList() {
            imageOptionsList.innerHTML = "";
            questionOptions.forEach((option, index) => {
                if (option.type === "image") {
                    const optionItem = document.createElement("div");
                    optionItem.className = "option-image-item";
                    optionItem.innerHTML = `
                        <div class="file-upload">
                            <input type="file" id="option-image-${option.id}" accept="image/*" onchange="handleOptionImageUpload(${option.id}, this)">
                            <div class="file-upload-label"><i class="fas fa-cloud-upload-alt"></i> Choose image for Option ${index + 1}</div>
                        </div>
                        <div class="image-preview-container">
                            <img id="option-image-preview-${option.id}" class="option-image-preview" alt="Option image preview">
                            <div class="remove-option" onclick="removeImageOption(${option.id})">
                                <i class="fas fa-times"></i>
                            </div>
                        </div>
                    `;
                    imageOptionsList.appendChild(optionItem);
                }
            });
        }

        // Handle option image upload
        function handleOptionImageUpload(optionId, fileInput) {
            const file = fileInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    updateImageOptionValue(optionId, e.target.result);
                    const preview = document.getElementById(`option-image-preview-${optionId}`);
                    preview.src = e.target.result;
                    preview.style.display = "block";
                };
                reader.readAsDataURL(file);
            }
        }

        // Handle answer image upload
        answerImageUpload.addEventListener("change", function (e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    answerImageData = e.target.result;
                    answerImagePreview.src = e.target.result;
                    answerImagePreview.style.display = "block";
                };
                reader.readAsDataURL(file);
            }
        });

        // Media type selection
        mediaTypeSelect.addEventListener("change", function () {
            const mediaType = this.value;

            // Hide all media input groups
            imageUploadGroup.style.display = "none";
            youtubeUrlGroup.style.display = "none";

            // Show the relevant group
            if (mediaType === "image") {
                imageUploadGroup.style.display = "block";
            } else if (mediaType === "youtube") {
                youtubeUrlGroup.style.display = "block";
            }
        });

        // Image preview
        imageUpload.addEventListener("change", function (e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    imagePreview.src = e.target.result;
                    imagePreview.style.display = "block";
                };
                reader.readAsDataURL(file);
            }
        });

        // Format buttons for explanation
        formatButtons.forEach(button => {
            button.addEventListener("click", function () {
                const format = this.getAttribute("data-format");
                const textarea = document.getElementById("explanation-text");
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const selectedText = textarea.value.substring(start, end);

                let formattedText = "";

                if (format === "##Heading##") {
                    formattedText = `## ${selectedText || "Heading"} ##\n`;
                } else if (format === "- List item") {
                    formattedText = `- ${selectedText || "List item"}\n`;
                } else if (format === "1. Numbered item") {
                    formattedText = `1. ${selectedText || "Numbered item"}\n`;
                } else {
                    // For other formats, wrap the selected text
                    const formatSymbols = format
                        .replace(selectedText || "text", "")
                        .split(" ")[0];
                    const openSymbol = formatSymbols.substring(
                        0,
                        formatSymbols.length / 2
                    );
                    const closeSymbol = formatSymbols.substring(
                        formatSymbols.length / 2
                    );

                    formattedText =
                        openSymbol + (selectedText || "text") + closeSymbol + " ";
                }

                textarea.value =
                    textarea.value.substring(0, start) +
                    formattedText +
                    textarea.value.substring(end);
                textarea.focus();
                updateExplanationPreview();
            });
        });

        // Explanation preview
        explanationText.addEventListener("input", updateExplanationPreview);

        function updateExplanationPreview() {
            let text = explanationText.value;
            if (!text) {
                explanationPreview.innerHTML = "Explanation preview will appear here";
                return;
            }

            // Convert markdown-like syntax to HTML
            text = text
                .replace(
                    /##(.*?)##/g,
                    '<strong style="font-size:1.2em;color:var(--strongColor)">$1</strong>'
                )
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                .replace(/\*(.*?)\*/g, "<em>$1</em>")
                .replace(/_(.*?)_/g, "<em>$1</em>")
                .replace(/~~(.*?)~~/g, "<del>$1</del>")
                .replace(/\+\+(.*?)\+\+/g, "<u>$1</u>")
                .replace(/==(.*?)==/g, '<span class="highlight">$1</span>')
                .replace(/^- (.*$)/gim, "<li>$1</li>")
                .replace(/^1\. (.*$)/gim, "<li>$1</li>")
                .replace(/(<li>.*<\/li>)/g, "<ul>$1</ul>");

            explanationPreview.innerHTML = text;
        }

        // Add topic to quiz info
        document.getElementById("add-topic").addEventListener("click", function () {
            const topicInput = document.getElementById("topic-input");
            const topic = topicInput.value.trim();

            if (topic && !quizInfoTopics.includes(topic)) {
                quizInfoTopics.push(topic);
                updateQuizInfoTopicsList();
                topicInput.value = "";
            }
        });

        // Add topic to question
        document.getElementById("add-question-topic")
            .addEventListener("click", function () {
                const topicInput = document.getElementById("question-topic-input");
                const topic = topicInput.value.trim();

                if (topic && !questionTopics.includes(topic)) {
                    questionTopics.push(topic);
                    updateQuestionTopicsList();
                    topicInput.value = "";
                }
            });

        // Update quiz info topics list
        function updateQuizInfoTopicsList() {
            topicsList.innerHTML = "";
            quizInfoTopics.forEach(topic => {
                const topicTag = document.createElement("div");
                topicTag.className = "topic-tag";
                topicTag.innerHTML = `
                    ${topic}
                    <span class="remove" data-topic="${topic}"><i class="fas fa-times"></i></span>
                `;
                topicsList.appendChild(topicTag);
            });

            // Add event listeners to remove buttons
            document.querySelectorAll("#topics-list .remove").forEach(button => {
                button.addEventListener("click", function () {
                    const topic = this.getAttribute("data-topic");
                    quizInfoTopics = quizInfoTopics.filter(t => t !== topic);
                    updateQuizInfoTopicsList();
                });
            });
        }

        // Update question topics list
        function updateQuestionTopicsList() {
            questionTopicsList.innerHTML = "";
            questionTopics.forEach(topic => {
                const topicTag = document.createElement("div");
                topicTag.className = "topic-tag";
                topicTag.innerHTML = `
                    ${topic}
                    <span class="remove" data-topic="${topic}"><i class="fas fa-times"></i></span>
                `;
                questionTopicsList.appendChild(topicTag);
            });

            // Add event listeners to remove buttons
            document
                .querySelectorAll("#question-topics-list .remove")
                .forEach(button => {
                    button.addEventListener("click", function () {
                        const topic = this.getAttribute("data-topic");
                        questionTopics = questionTopics.filter(t => t !== topic);
                        updateQuestionTopicsList();
                    });
                });
        }

        // Save quiz info
        saveQuizInfoBtn.addEventListener("click", function () {
            const quizName = document.getElementById("quiz-name").value.trim();
            const course = document.getElementById("course").value.trim();
            const timeAllowed = document.getElementById("time-allowed").value.trim();

            if (quizName && course && timeAllowed) {
                quizInfo = {
                    type: "quizInfo",
                    kind: "pureOBJ",
                    quiz_name: quizName,
                    course: course,
                    topics: [...quizInfoTopics],
                    time: timeAllowed
                };

                // Update banner
                updateQuizInfoBanner();

                // Update elements list
                updateElementList();

                // Update preview
                updatePreview();

                // Show success message
                alert("Quiz info saved successfully!");
            } else {
                alert("Please fill in all required fields for quiz info");
            }
        });

        // Edit quiz info
        editQuizInfoBtn.addEventListener("click", function () {
            if (quizInfo) {
                document.getElementById("quiz-name").value = quizInfo.quiz_name;
                document.getElementById("course").value = quizInfo.course;
                document.getElementById("time-allowed").value = quizInfo.time;
                quizInfoTopics = [...quizInfo.topics];
                updateQuizInfoTopicsList();

                // Switch to quiz info tab
                tabs.forEach(t => t.classList.remove("active"));
                document.querySelector('[data-tab="quizInfo"]').classList.add("active");
                tabContents.forEach(content => content.classList.remove("active"));
                document.getElementById("quizInfo-tab").classList.add("active");
            }
        });

        // Update quiz info banner
        function updateQuizInfoBanner() {
            if (quizInfo) {
                quizInfoBanner.style.display = "flex";
                bannerQuizName.textContent = quizInfo.quiz_name;
                bannerCourse.textContent = `Course: ${quizInfo.course}`;
                bannerQuizTime.textContent = `Time: ${quizInfo.time} minutes`;

                if (quizInfo.topics.length > 0) {
                    bannerQuizTopics.textContent = `Topics: ${quizInfo.topics.join(
                        ", "
                    )}`;
                    bannerQuizTopics.style.display = "block";
                } else {
                    bannerQuizTopics.style.display = "none";
                }
            } else {
                quizInfoBanner.style.display = "none";
            }
        }

        // Add heading element
        document.getElementById("add-heading").addEventListener("click", function () {
            const headingText = document.getElementById("heading-text").value.trim();

            if (headingText) {
                const element = {
                    type: "heading",
                    content: headingText
                };

                addElement(element);
                document.getElementById("heading-text").value = "";
            } else {
                alert("Please enter a heading text");
            }
        });

        // Add instruction element
        document
            .getElementById("add-instruction")
            .addEventListener("click", function () {
                const instructionText = document
                    .getElementById("instruction-text")
                    .value.trim();

                if (instructionText) {
                    const element = {
                        type: "Instruction",
                        content: [instructionText]
                    };

                    addElement(element);
                    document.getElementById("instruction-text").value = "";
                } else {
                    alert("Please enter instruction text");
                }
            });

        // Add question element
        document
            .getElementById("add-question-btn")
            .addEventListener("click", function () {
                const questionName = document
                    .getElementById("question-name")
                    .value.trim();
                const questionText = document
                    .getElementById("question-text")
                    .value.trim();
                const answerText = document.getElementById("answer-text").value.trim();
                const explanationText = document
                    .getElementById("explanation-text")
                    .value.trim();
                const hintText = document.getElementById("hint-text").value.trim();
                const questionType = document.getElementById("question-type").value;

                if (questionName && questionText) {
                    // Validate multiple choice answer
                    if (questionType === "multiple-choice") {
                        if (optionType === "text") {
                            // For text options, check if answer matches one of the options
                            const textOptions = questionOptions.filter(opt => opt.type === "text").map(opt => opt.content);
                            if (answerType === "text" && !textOptions.includes(answerText)) {
                                alert(
                                    "For multiple choice questions with text options, the answer must be one of the options"
                                );
                                return;
                            }
                        } else {
                            // For image options, we need at least one option
                            if (questionOptions.length === 0) {
                                alert("Please add at least one image option");
                                return;
                            }
                        }
                    }

                    // Handle answer based on type
                    let answerContent;
                    if (answerType === "text") {
                        answerContent = answerText;
                    } else {
                        if (!answerImageData) {
                            alert("Please upload an image for the answer");
                            return;
                        }
                        answerContent = answerImageData;
                    }

                    const element = {
                        type: "Question",
                        name: questionName,
                        topic: [...questionTopics],
                        Question: {
                            content: questionText,
                            type: questionType
                        },
                        Answer: {
                            type: answerType,
                            content: answerContent
                        }
                    };

                    // Add options for multiple choice
                    if (questionType === "multiple-choice") {
                        element.Question.options = [...questionOptions];
                        element.Question.optionType = optionType;
                    } else if (questionType === "true-false") {
                        element.Question.options = ["True", "False"];
                    }

                    // Add explanation if provided
                    if (explanationText) {
                        element.Explanation = {
                            type: "string",
                            content: explanationText
                        };
                    }

                    // Add hint if provided
                    if (hintText) {
                        element.Hint = {
                            type: "string",
                            content: hintText
                        };
                    }

                    addElement(element);

                    // Reset form
                    document.getElementById("question-name").value = "";
                    document.getElementById("question-text").value = "";
                    document.getElementById("answer-text").value = "";
                    document.getElementById("explanation-text").value = "";
                    document.getElementById("hint-text").value = "";
                    questionTopics = [];
                    questionOptions = [];
                    answerImageData = null;
                    updateQuestionTopicsList();
                    updateTextOptionsList();
                    updateImageOptionsList();
                    explanationPreview.innerHTML =
                        "Explanation preview will appear here";
                    optionsContainer.style.display = "none";
                    answerImagePreview.style.display = "none";
                } else {
                    alert("Please fill in all required fields for the question");
                }
            });

        // Add media element
        document.getElementById("add-media").addEventListener("click", function () {
            const mediaType = document.getElementById("media-type").value;
            const caption = mediaCaptionInput.value.trim();

            let element = {
                type: "img",
                content: ""
            };

            // Add caption if provided
            if (caption) {
                element.caption = caption;
            }

            if (mediaType === "image") {
                const fileInput = document.getElementById("image-upload");
                if (fileInput.files.length > 0) {
                    const file = fileInput.files[0];
                    const reader = new FileReader();

                    reader.onload = function (e) {
                        element.content = e.target.result;
                        addElement(element);
                        resetMediaForm();
                    };

                    reader.readAsDataURL(file);
                } else {
                    alert("Please select an image file");
                }
            } else if (mediaType === "youtube") {
                const youtubeUrl = document.getElementById("youtube-url").value.trim();
                if (youtubeUrl) {
                    element.content = youtubeUrl;
                    addElement(element);
                    resetMediaForm();
                } else {
                    alert("Please enter a YouTube URL");
                }
            }
        });

        // Reset media form
        function resetMediaForm() {
            document.getElementById("image-upload").value = "";
            document.getElementById("youtube-url").value = "";
            mediaCaptionInput.value = "";
            imagePreview.style.display = "none";
        }

        // Add element to quiz
        function addElement(element) {
            // Add ID and timestamp
            element.id = Date.now();
            element.timestamp = new Date().toISOString();

            // Add to array (except quizInfo which is handled separately)
            if (element.type !== "quizInfo") {
                quizElements.push(element);
            }

            // Update UI
            updateElementList();
            updatePreview();
        }

        // Remove element from quiz
        function removeElement(id) {
            quizElements = quizElements.filter(element => element.id !== id);
            updateElementList();
            updatePreview();
        }

        // Move element up in the list
        function moveElementUp(id) {
            const index = quizElements.findIndex(element => element.id === id);
            if (index > 0) {
                // Swap with previous element
                [quizElements[index - 1], quizElements[index]] = [
                    quizElements[index],
                    quizElements[index - 1]
                ];
                updateElementList();
                updatePreview();
            }
        }

        // Move element down in the list
        function moveElementDown(id) {
            const index = quizElements.findIndex(element => element.id === id);
            if (index < quizElements.length - 1) {
                // Swap with next element
                [quizElements[index], quizElements[index + 1]] = [
                    quizElements[index + 1],
                    quizElements[index]
                ];
                updateElementList();
                updatePreview();
            }
        }

        // Update element list in UI
        function updateElementList() {
            elementList.innerHTML = "";

            if (!quizInfo && quizElements.length === 0) {
                elementList.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-inbox"></i>
                        <p>No elements added yet. Start by adding Quiz Info!</p>
                    </div>
                `;
                return;
            }

            // Show quiz info first if it exists
            if (quizInfo) {
                const quizInfoItem = document.createElement("div");
                quizInfoItem.className = "element-item";
                quizInfoItem.innerHTML = `
                    <div class="element-header">
                        <span class="element-type">Quiz Info</span>
                        <div class="element-actions">
                            <button class="btn btn-outline""><i class="fas fa-edit"></i></button>
                        </div>
                    </div>
                    <div class="element-content">${quizInfo.quiz_name} - ${quizInfo.course} - ${quizInfo.time} minutes</div>
                `;
                elementList.appendChild(quizInfoItem);
            }

            // Show other elements
            quizElements.forEach(element => {
                const elementItem = document.createElement("div");
                elementItem.className = "element-item";

                let content = "";
                let typeLabel = "";

                if (element.type === "heading") {
                    content = element.content;
                    typeLabel = "Heading";
                } else if (element.type === "Instruction") {
                    content = element.content[0];
                    typeLabel = "Instruction";
                } else if (element.type === "Question") {
                    content = element.Question.content;
                    typeLabel = "Question";
                    
                    // Add info about answer type
                    if (element.Answer.type === "image") {
                        content += " (Image Answer)";
                    }
                    
                    // Add info about option type for multiple choice
                    if (element.Question.type === "multiple-choice" && element.Question.optionType) {
                        content += ` (${element.Question.optionType === "image" ? "Image" : "Text"} Options)`;
                    }
                } else if (element.type === "img") {
                    content = element.content.substring(0, 50) + "...";
                    typeLabel = "Media";
                    if (element.caption) {
                        content += ` (Caption: ${element.caption})`;
                    }
                }

                elementItem.innerHTML = `
                    <div class="element-header">
                        <span class="element-type">${typeLabel}</span>
                        <div class="element-actions">
                            <button class="btn" onclick="moveElementUp(${element.id})"><i class="fas fa-arrow-up"></i></button>
                            <button class="btn" onclick="moveElementDown(${element.id})"><i class="fas fa-arrow-down"></i></button>
                            <button class="btn btn-danger" onclick="removeElement(${element.id})"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                    <div class="element-content">${content}</div>
                `;

                elementList.appendChild(elementItem);
            });
        }

        // Update preview
        function updatePreview() {
            previewContent.innerHTML = "";

            if (!quizInfo && quizElements.length === 0) {
                previewContent.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-file-alt"></i>
                        <p>Your quiz preview will appear here as you add elements.</p>
                    </div>
                `;
                return;
            }

            // Show quiz info first
            if (quizInfo) {
                const quizInfoDiv = document.createElement("div");
                quizInfoDiv.className = "quiz-element";
                quizInfoDiv.innerHTML = `
                    <h2 class="quiz-heading">${quizInfo.quiz_name}</h2>
                    <p><strong>Course:</strong> ${quizInfo.course}</p>
                    <p><strong>Time Allowed:</strong> ${
                        quizInfo.time
                    } minutes</p>
                    ${
                        quizInfo.topics.length > 0
                            ? `<p><strong>Topics:</strong> ${quizInfo.topics.join(
                                  ", "
                              )}</p>`
                            : ""
                    }
                `;
                previewContent.appendChild(quizInfoDiv);
            }

            // Show other elements
            quizElements.forEach(element => {
                const elementDiv = document.createElement("div");
                elementDiv.className = "quiz-element";

                if (element.type === "heading") {
                    elementDiv.innerHTML = `<h3 class="quiz-heading">${element.content}</h3>`;
                } else if (element.type === "Instruction") {
                    elementDiv.innerHTML = `<p class="quiz-instruction">${element.content[0]}</p>`;
                } else if (element.type === "Question") {
                    let hintHtml = "";
                    if (element.Hint) {
                        hintHtml = `<div class="hint-box"><strong>Hint:</strong> ${element.Hint.content}</div>`;
                    }

                    let optionsHtml = "";
                    if (
                        element.Question.type === "multiple-choice" &&
                        element.Question.options
                    ) {
                        if (element.Question.optionType === "text") {
                            // Text options
                            const textOptions = element.Question.options.filter(opt => opt.type === "text");
                            optionsHtml = `<div style="margin: 15px 0;"><strong>Options:</strong><ul style="margin-left: 20px;">${textOptions
                                .map(opt => `<li>${opt.content}</li>`)
                                .join("")}</ul></div>`;
                        } else {
                            // Image options
                            const imageOptions = element.Question.options.filter(opt => opt.type === "image");
                            optionsHtml = `<div style="margin: 15px 0;"><strong>Options:</strong><div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px;">${imageOptions
                                .map(opt => `<img src="${opt.content}" alt="Option" style="max-width: 150px; max-height: 150px; border-radius: var(--border-radius);">`)
                                .join("")}</div></div>`;
                        }
                    } else if (element.Question.type === "true-false") {
                        optionsHtml = `<div style="margin: 15px 0;"><strong>Options:</strong> True, False</div>`;
                    }

                    let answerHtml = "";
                    if (element.Answer.type === "text") {
                        answerHtml = `<p><strong>Answer:</strong> ${element.Answer.content}</p>`;
                    } else {
                        answerHtml = `<p><strong>Answer:</strong></p><img src="${element.Answer.content}" alt="Answer" class="quiz-image">`;
                    }

                    let explanationHtml = "";
                    if (element.Explanation) {
                        let explanationText = element.Explanation.content
                            .replace(
                                /##(.*?)##/g,
                                '<strong style="font-size:1.2em;color:var(--strongColor)">$1</strong>'
                            )
                            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                            .replace(/\*(.*?)\*/g, "<em>$1</em>")
                            .replace(/_(.*?)_/g, "<em>$1</em>")
                            .replace(/~~(.*?)~~/g, "<del>$1</del>")
                            .replace(/\+\+(.*?)\+\+/g, "<u>$1</u>")
                            .replace(/==(.*?)==/g, '<span class="highlight">$1</span>')
                            .replace(/^- (.*$)/gim, "<li>$1</li>")
                            .replace(/^1\. (.*$)/gim, "<li>$1</li>")
                            .replace(/(<li>.*<\/li>)/g, "<ul>$1</ul>");

                        explanationHtml = `<div class="quiz-explanation">${explanationText}</div>`;
                    }

                    elementDiv.innerHTML = `
                        <h3 class="quiz-heading">${element.name}</h3>
                        ${
                            element.topic.length > 0
                                ? `<p><strong>Topics:</strong> ${element.topic.join(
                                      ", "
                                  )}</p>`
                                : ""
                        }
                        <p class="quiz-question">${element.Question.content}</p>
                        ${optionsHtml}
                        ${hintHtml}
                        ${answerHtml}
                        ${explanationHtml}
                    `;
                } else if (element.type === "img") {
                    // Check if it's a YouTube URL
                    if (
                        element.content.includes("youtube.com") ||
                        element.content.includes("youtu.be")
                    ) {
                        const videoId = extractYouTubeId(element.content);
                        if (videoId) {
                            elementDiv.innerHTML = `
                                <iframe class="quiz-video" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
                                ${element.caption ? `<p class="media-caption">${element.caption}</p>` : ''}
                            `;
                        } else {
                            elementDiv.innerHTML = `<p>Invalid YouTube URL: ${element.content}</p>`;
                        }
                    } else {
                        elementDiv.innerHTML = `
                            <img src="${element.content}" alt="Quiz diagram" class="quiz-image">
                            ${element.caption ? `<p class="media-caption">${element.caption}</p>` : ''}
                        `;
                    }
                }

                previewContent.appendChild(elementDiv);
            });
        }

        // Extract YouTube video ID from URL
        function extractYouTubeId(url) {
            const regExp =
                /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
            const match = url.match(regExp);
            return match && match[7].length === 11 ? match[7] : false;
        }

        // Clear all elements
        document.getElementById("clear-all").addEventListener("click", function () {
            if (confirm("Are you sure you want to clear all quiz elements?")) {
                quizElements = [];
                quizInfo = null;
                quizInfoTopics = [];
                updateElementList();
                updatePreview();
                updateQuizInfoBanner();
            }
        });

        // Create quiz JSON
        document.getElementById("create-quiz").addEventListener("click", function () {
            if (!quizInfo) {
                alert("Please add quiz info before creating JSON.");
                return;
            }

            // Create the final quiz data array
            const quizData = [];

            // Add quizInfo first
            quizData.push({
                type: "quizInfo",
                kind: "pureOBJ",
                quiz_name: quizInfo.quiz_name,
                course: quizInfo.course,
                topics: [...quizInfo.topics],
                time: quizInfo.time
            });

            // Add other elements
            quizElements.forEach(element => {
                const cleanElement = JSON.parse(JSON.stringify(element));
                delete cleanElement.id;
                delete cleanElement.timestamp;
                quizData.push(cleanElement);
            });

            // Log to console
            console.log("Quiz JSON:", quizData);

            // Show success message
            alert("Quiz JSON has been created and logged to the console!");

            // Optionally, display the JSON in the preview area
            /*
            */
            previewContent.innerHTML = `<pre style="background: #f5f5f5; padding: 15px; border-radius: var(--border-radius); overflow: auto;">${JSON.stringify(
                quizData,
                null,
                2
            )}</pre>`;
        });

        // Initialize the UI
        updateElementList();
        updatePreview();
        updateQuizInfoBanner();
