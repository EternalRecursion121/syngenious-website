<script lang="ts">
    import "../app.css";
    import Nav from "$lib/components/Nav.svelte";
    import Footer from "$lib/components/Footer.svelte";

    import { theme } from "$lib/themeStore";
    import { onMount } from "svelte";

    import AOS from "aos";
    import "aos/dist/aos.css";

    let cursor: HTMLDivElement;

    onMount(() => {
        AOS.init();
        AOS.refresh();

        document.documentElement.classList.add($theme);
        
        console.log('ontouchstart' in window)
        if (!('ontouchstart' in window || navigator.maxTouchPoints)) {
            document.addEventListener('mousemove', (e) => {
                cursor.style.left = e.pageX + 'px';
                cursor.style.top = e.pageY + 'px';
            });

            document.body.addEventListener("mouseover", (e) => {
                if (e.target.closest(".clickable") || (e.target.tagName.toLowerCase() === "a") || (e.target.tagName.toLowerCase() === "button")) {
                    cursor.style.transform='scale(1.4)'
                    cursor.classList.add("halo");
                }
            });

            document.body.addEventListener("mouseout", (e) => {
                if (e.target.classList.contains("clickable") || (e.target.tagName.toLowerCase() === "a") || (e.target.tagName.toLowerCase() === "button")) {
                    cursor.classList.remove("halo");
                    cursor.style.transform='scale(1)'
                }
            });

            document.addEventListener("mouseleave", () => {
                cursor.classList.add("hidden");
            });

            document.addEventListener("mouseenter", () => {
                cursor.classList.remove("hidden");
            });
        } else {
            cursor.style.display = "none";
        }


        document.addEventListener('click', (e) => {
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            ripple.style.left = e.pageX - 25 + 'px';
            ripple.style.top = e.pageY - 25 + 'px';

            document.body.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });
</script>

<div id="cursor" class="red-dot" bind:this={cursor}></div>
<div class="min-h-screen min-w-screen">
    <Nav />
    <slot />
    <Footer />
</div>