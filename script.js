

    const logo = document.querySelector('.logo');
    const letters = document.querySelectorAll('.letter');
    const slideSound = document.getElementById('slideSound');
    const tzinSound = document.getElementById('tzinSound');
    const shapesContainer = document.querySelector('.shapes-container');
    const shapesContainer2 = document.querySelector('.shapes-container2');
    const shapes = [];

    for (let i = 0; i < 5; i++) {
      shapes[i] = new mojs.Shape({
        parent: shapesContainer,
        shape: 'circle',
        fill: 'white',
        radius: { 0: 'rand(3, 15)' },
        x: 'rand(-100, 0)',
        y: 'rand(-100, 100)',
        delay: 'rand(0, 350)',
        duration: 600,
      });

      // Initially hide the shapes
      shapes[i].el.style.display = 'none';
    }
      for (let i = 5; i < 10; i++) {
      shapes[i] = new mojs.Shape({
        parent: shapesContainer2,
        shape: 'circle',
        fill: 'white',
        radius: { 0: 'rand(3, 15)' },
        x: 'rand(50, 250)',
        y: 'rand(-100, 100)',
        delay: 'rand(0, 350)',
        duration: 600,
      });

      // Initially hide the shapes
      shapes[i].el.style.display = 'none';
    }

        // Function to show the shapes
        function showShapes() {
      for (let i = 0; i < shapes.length; i++) {
        shapes[i].el.style.display = 'block';
      }
    }
// Function to hide the shapes with a fade-out effect
function hideShapes() {
  gsap.to(shapes.map((shape) => shape.el), {
    opacity: 0,
    duration: 1, // You can adjust the duration as needed
    stagger: 0.2, // Add a stagger effect
    ease: 'power1.inOut', // Choose an easing function that suits your animation
    onComplete: () => {
      // Hide the shapes by setting display to 'none' when the animation is complete
      shapes.forEach((shape) => {
        shape.el.style.display = 'none';
      });
    },
  });
}


    // Function to calculate a random position
    function calculateRandomPosition() {
      if (Math.random() < 0.5) {
        return `random(100, 200)`;
      } else {
        return `random(-200, -100)`;
      }
    }

    // Set random positions for each letter
    letters.forEach((letter) => {
      gsap.set(letter, {
        x: calculateRandomPosition(),
        y: calculateRandomPosition(),
      });
    });

    // Use GSAP timeline for looping animation
    const timeline = gsap.timeline({ repeat: 0, yoyo: false });

    timeline.to(letters, {
      onStart: () => {
        // Play the sliding sound when the animation starts
        slideSound.play();
        console.log("start sliding")
      },
      x: 0,
      y: 'random(50, 200)', // Randomize the initial y position between 50 and 200
      duration: 1,
      stagger: 0.15,
      ease: 'elastic.out(1, 0.3)',

      onComplete: () => {
        console.log("complete")
        //
        // Animation complete, you can add more actions here if needed.
      }
    });

    // Additional animation to move to the correct y position with a delta curve effect
    timeline.to(letters, {
      y: 0, // Move to the correct y position (0)
      duration: 1.5,
      stagger: 0.15,
      ease: 'elastic.out(1, 0.3)',
      onStart: () => {
        console.log("start")
        // Play the "tzin" sound when the animation reaches the correct position

      },
      onComplete: () => {
        console.log("complete")
        tzinSound.play();
        showShapes();
        for (let i = 0; i < shapes.length; i++) {
        shapes[i].generate().replay();
          
        }
        hideShapes();

        // Animation complete, you can add more actions here if needed.
      }


    });

